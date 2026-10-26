import argparse
import re
from pathlib import Path


REMOVE_CHARS = str.maketrans("", "", "~<>")

# Matches YAML block scalar indicators: |, >, |-, >+, |2, etc.
BLOCK_SCALAR = re.compile(r"^[|>](?:[+-]?[1-9]?|[1-9][+-]?)$")


def find_key_separator(line):
    """
    Find the colon separating a YAML key from its value.
    Ignore colons inside quoted strings.
    """
    quote = None
    i = 0

    while i < len(line):
        char = line[i]

        if quote:
            if quote == '"' and char == "\\":
                i += 2
                continue

            if char == quote:
                # YAML single quotes escape themselves as ''
                if quote == "'" and i + 1 < len(line) and line[i + 1] == "'":
                    i += 2
                    continue

                quote = None

        elif char in ("'", '"'):
            quote = char

        elif char == ":":
            # YAML mapping separators require whitespace or end of line.
            if i + 1 == len(line) or line[i + 1].isspace():
                return i

        i += 1

    return -1


def get_indent(line):
    return len(line) - len(line.lstrip(" "))


def process_yaml(content):
    lines = content.splitlines(keepends=True)
    result = []

    # Indentation level of the active multiline scalar.
    block_indent = None

    for line in lines:
        stripped = line.strip()

        # Preserve empty lines and comments.
        if not stripped or stripped.startswith("#"):
            result.append(line)
            continue

        indent = get_indent(line)

        # Skip lines belonging to a multiline string.
        if block_indent is not None:
            if indent > block_indent:
                result.append(line)
                continue

            block_indent = None

        # Separate line endings to preserve them.
        body = line.rstrip("\r\n")
        ending = line[len(body):]

        # Handle list items: "- Key: Value"
        prefix_match = re.match(r"^(\s*(?:-\s+)?)(.*)$", body)

        if not prefix_match:
            result.append(line)
            continue

        prefix, remainder = prefix_match.groups()

        separator = find_key_separator(remainder)

        if separator == -1:
            result.append(line)
            continue

        key = remainder[:separator]
        value = remainder[separator + 1:]

        # Remove characters only from the key.
        new_key = key.translate(REMOVE_CHARS)

        new_body = prefix + new_key + ":" + value

        result.append(new_body + ending)

        # Detect multiline strings.
        value_without_comment = value.split("#", 1)[0].strip()

        if BLOCK_SCALAR.fullmatch(value_without_comment):
            block_indent = indent

    return "".join(result)


def process_file(path):
    # newline="" preserves original CRLF/LF line endings.
    with open(path, "r", encoding="utf-8", newline="") as f:
        original = f.read()

    modified = process_yaml(original)

    if modified == original:
        print(f"Unchanged: {path}")
        return

    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(modified)

    print(f"Updated:   {path}")


def main():
    parser = argparse.ArgumentParser(
        description="Remove ~, < and > from YAML keys while preserving formatting."
    )

    parser.add_argument(
        "path",
        help="Relative path to a YAML file or folder."
    )

    args = parser.parse_args()

    path = Path(args.path)

    if not path.exists():
        print(f"Path does not exist: {path}")
        return

    if path.is_file():
        if path.suffix.lower() not in (".yml", ".yaml"):
            print("File must be .yml or .yaml")
            return

        process_file(path)

    elif path.is_dir():
        files = sorted(
            p for p in path.rglob("*")
            if p.is_file() and p.suffix.lower() in (".yml", ".yaml")
        )

        print(f"Found {len(files)} YAML files.\n")

        for file in files:
            process_file(file)


if __name__ == "__main__":
    main()