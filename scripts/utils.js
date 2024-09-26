const { keccak256, toUtf8Bytes } = require('ethers');
const linkReferences = require('./linkedReferences.json')

function linkLibraries(linkedBytecode) {
    for (var library of linkReferences) {
        const hashedPath = keccak256(toUtf8Bytes(library.linkReference)).slice(2, 36);
        linkedBytecode = linkedBytecode.replaceAll(`__$${hashedPath}$__`, library.address.slice(2))
    }

    return linkedBytecode
}

module.exports = {
    linkReferences,
    linkLibraries,
}