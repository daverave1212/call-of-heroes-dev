import yaml

INPUT_FILE = "./MagicItems.yml"
OUTPUT_FILE = "./MagicItemsFormatted.yml"


# --------------------------------------------------
# Custom YAML formatting
# --------------------------------------------------

class CustomDumper(yaml.SafeDumper):
    pass


def represent_string(dumper, value):
    # Use | for multiline strings
    if "\n" in value:
        return dumper.represent_scalar(
            "tag:yaml.org,2002:str",
            value,
            style="|"
        )

    return dumper.represent_scalar(
        "tag:yaml.org,2002:str",
        value
    )


def represent_list(dumper, value):
    # Force lists to use [A, B, C]
    return dumper.represent_sequence(
        "tag:yaml.org,2002:seq",
        value,
        flow_style=True
    )


CustomDumper.add_representer(str, represent_string)
CustomDumper.add_representer(list, represent_list)


# --------------------------------------------------
# Load
# --------------------------------------------------

with open(INPUT_FILE, "r", encoding="utf-8") as file:
    data = yaml.safe_load(file)


output = {
    "Meta": {
        "Descriptions": {}
    },
    "Items": {}
}


# --------------------------------------------------
# Transform
# --------------------------------------------------

for rarity, category in data.items():

    if "Description" in category:
        output["Meta"]["Descriptions"][rarity] = category["Description"]

    for item_name, item in category.get("Items", {}).items():

        if item_name in output["Items"]:
            raise ValueError(
                f'Duplicate magic item found: "{item_name}"'
            )

        tags = item.get("Tags", [])

        if not isinstance(tags, list):
            tags = [tags]

        if rarity in tags:
            tags.remove(rarity)

        tags.insert(0, rarity)

        formatted_item = {
            **item,
            "Tags": tags
        }

        if rarity != "Common":
            formatted_item["Set"] = "core"

        output["Items"][item_name] = formatted_item


# --------------------------------------------------
# Save
# --------------------------------------------------

with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
    yaml.dump(
        output,
        file,
        Dumper=CustomDumper,
        allow_unicode=True,
        sort_keys=False,
        width=1000
    )


print(f"Created {OUTPUT_FILE}")