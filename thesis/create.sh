DECKBLATT_FILE=./Deckblatt-BA.pdf
RAW_THESIS_FILE=./Thesis.pdf
THESIS_FILE=./Bachelorthesis.pdf
FILE_PATH=$(pwd)

filenames=$(ls | grep -E "[0-9][0-9].*.md")


# docker run --rm --volume "$FILE_PATH:/data" --user $(id -u):$(id -g) \
	# akatranlp/pandoc $filenames --defaults ./defaults.yaml

pandoc $filenames --defaults ./defaults.yaml

docker run --rm --volume "$FILE_PATH:/data" --user $(id -u):$(id -g) \
	akatranlp/pdfhandler merge $DECKBLATT_FILE $RAW_THESIS_FILE $THESIS_FILE

rm $RAW_THESIS_FILE
