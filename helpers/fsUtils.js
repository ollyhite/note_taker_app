const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
// add res becuase readAndAppend() will faster
const writeToFile = (destination, content, res) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    return err ? console.error(err) : res.send("OK");
  });
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

//add new data to database
const readAndAppend = (content, file, res) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData, res);
    }
  });
};

//update data to database
const readAndUpdate = (id, content, file, res) => {
  console.log("content", content);
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      // console.log("parsedData",parsedData);
      const newdbData = parsedData.map((item) =>
        item.id === id
          ? {
              ...item,
              title: content.title,
              text: content.text,
              color: content.color,
              date: content.date,
            }
          : item
      );
      writeToFile(file, newdbData, res);
    }
  });
};
//delete data to database
const readAndDelete = (id, content, file, res) => {
  console.log("content", content);
  console.log("file", file);
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      //   console.log("parsedData", parsedData);
      const idToRemove = id;
      const removeItem = parsedData.filter((item) => item.id !== idToRemove);
      console.log("removeItem", removeItem);
      writeToFile(file, removeItem, res);
    }
  });
};

module.exports = {
  readFromFile,
  writeToFile,
  readAndAppend,
  readAndUpdate,
  readAndDelete,
};
