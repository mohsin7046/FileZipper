class Node {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function buildTree(freqMap) {
    const nodes = Object.keys(freqMap).map(char => new Node(char, freqMap[char]));
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        const left = nodes.shift();
        const right = nodes.shift();
        const newNode = new Node(null, left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;
        nodes.push(newNode);
    }
    return nodes[0];
}

function generateCodes(node, prefix = '', codeMap = {}) {
    if (node.char !== null) {
        codeMap[node.char] = prefix;
    } else {
        generateCodes(node.left, prefix + '0', codeMap);
        generateCodes(node.right, prefix + '1', codeMap);
    }
    return codeMap;
}

function huffmanEncode(text) {
    const freqMap = {};
    for (const char of text) freqMap[char] = (freqMap[char] || 0) + 1;
    const tree = buildTree(freqMap);
    const codeMap = generateCodes(tree);
    const encoded = text.split('').map(char => codeMap[char]).join('');
    return { encoded, codeMap, tree };
}

function huffmanDecode(encoded, tree) {
    let decoded = '';
    let currentNode = tree;
    for (const bit of encoded) {
        currentNode = bit === '0' ? currentNode.left : currentNode.right;
        if (currentNode.char !== null) {
            decoded += currentNode.char;
            currentNode = tree;
        }
    }
    return decoded;
}

export { huffmanEncode, huffmanDecode };
