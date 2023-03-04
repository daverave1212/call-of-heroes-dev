echo Starting build and deployment...
echo Commit message: %1

echo 1. Generating JSONS from YAML
python generate-jsons-from-yaml.py

echo 2. Building React App
cd "WebsiteReact2"
cd "call-of-heroes-website-react-2"
npm run build

