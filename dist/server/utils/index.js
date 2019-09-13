"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var flipMatrix = function flipMatrix(matrix) {
    return matrix[0].map(function (column, index) {
        return matrix.map(function (row) {
            return row[index];
        });
    });
};

var randomNumber = function randomNumber(num) {
    return Math.floor(Math.random() * num);
};

exports.flipMatrix = flipMatrix;
exports.randomNumber = randomNumber;