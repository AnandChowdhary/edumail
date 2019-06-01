# Get the JetBrains/swot repo
cd ~/
mkdir temp-update && cd temp-update
git clone git@github.com:JetBrains/swot

# Get the edumail repo
git clone git@github.com:AnandChowdhary/edumail

# Copy data
rm -r edumail/domains
mv swot/lib/domains edumail

# Update project
cd edumail
git add .
git commit -m ":card_file_box: Update data from JetBrains/swot"
git push origin master

# Remove all temp files
cd ../
rm -rf temp-update
