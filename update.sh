# Get the JetBrains/swot repo
cd ~/
rm -rf temp-update
mkdir temp-update && cd temp-update
git clone --depth=1 git@github.com:JetBrains/swot

# Get the edumail repo
git clone --depth=1 git@github.com:AnandChowdhary/edumail

# Copy data
rm -rf edumail/domains
cp -r swot/lib/domains edumail
echo "Updated files!"

# Update project and NPM
cd edumail
git add .
git commit -m ":card_file_box: Update data from JetBrains/swot"
npm version patch -m ":rocket: Bump package version"
git push origin master
yarn
yarn build
npm publish
echo "Published to GitHub and NPM"

# Remove all temp files
cd ../../
rm -rf temp-update
echo "Completed updating Edumail!"
