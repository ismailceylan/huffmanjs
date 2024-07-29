# HuffmanJS
This is a port of the [Huffman algorithm](https://en.wikipedia.org/wiki/Huffman_coding) in pure JavaScript.

It can compress given string and put huffman code into it. It can also decompress original data using just the compressed binary.

If we want to export huffman codes, it can also do this. So we can store it on the cloud and then compressed part can circulate around with the light form of it.

This library can work on browsers too. So the sky is the limit of the possibilities.

## Installation
```bash
npm install @iceylan/huffmanjs
```

## Usage
### Compression
```js
import { compress } from "@iceylan/huffmanjs";

const [ compressedBinary, huffmanCodes ] = compress( "Hello world!" );
```

#### Explanation of the Binary Data
`compressedBinary` holds the compressed binary data.

```
Ñur! 3 rà5ŸdÀ5Ÿl€6Ÿ!`5Ÿo@5ŸH04Ÿe 4Ÿ 4Ÿw 4ÿÿ2¤ ½˜
```

The first 4 bytes of the binary data is the magic bytes of the library which we can easily change to any length of something else we want from `lib/constants.js` file.

Next one byte is a separator byte which we can easily change it, too.

Next byte can be numbers from `0` to `7`, which represents the length of the zero bits that added to the encoded data's latest byte to complete it to 8 bits.

Next one is again a separator byte.

And the `ÿÿ` characters at the 43rd byte is used to declare the end of the meta definitions. Until that point, all the encoded characters belongs to Huffman codes.

Every `Ÿ` character of the Huffman code part is the separator that splits the chunks of the Huffman code. which can changeable.

For example the first Huffman code chunk `rà5` consists of 3 abstract part. First byte `r` represents the original character that before compression. Latest one that consists of single digit numeric byte `5` represents the length of the zero bits that added to the Huffman code of the chunk's latest byte to complete it to 8 bits and the middle part of these two's which can be any length but 1 or 2 at most, represents the encoded forms of the Huffman code that related to the original character of the chunk. After decoding the chunk, result should look like `{"011": "r"}` which it can be used to decode the original data.

And the latest 5 bytes `2¤ ½˜` represents the compressed form of `Hello world!`.

#### Explanation of the Huffman Codes
Huffman codes is a map to convert characters into ones and the zeros as string. Library generates it from the original data. After we convert all the characters in the original data into Huffman codes, we divide them into groups of 8 and convert them into ascii characters. The easiest way to get the original data from the compressed data is use this map.

```js
[
	{ "010": "H" },
	{ "110": "e" },
	{ "001": "l" },
	{ "111": "o" },
]
```

The library provides Huffman code serialization and deserialization ability. If we want to store the code table in the somewhere else rather than the binary data, we can serialize it to save some space.

```js
import { serializeBitmap, unserializeBitmap } from "@iceylan/huffmanjs";

const serialized = serializeBitmap( huffmanCodes );
// it returns
// rà5ŸdÀ5Ÿl€6Ÿ!`5Ÿo@5ŸH04Ÿe 4Ÿ 4Ÿw 4

const unserialized = unserializeBitmap( serialized );
// it returns
// [{"010":"H"},{"110":"e"},{"001":"l"},{"111":"o"}]
```

The serialized data can easily can be stored as plain text anywhere because it uses fixed 8 bits per character ASCII encoding.

### Decompression
We can easily decompress the compressed binary data.

#### Standalone Decompression
With this scenario, we can decompress the compressed binary data without any additional code table. The binary has it's own Huffman code in it so it can decompress itself.

```js
import { decompress } from "@iceylan/huffmanjs";

const decompressed = decompress( compressedBinary );
// Hello world!
```

#### Decompression with External Code Table
With this scenario, we can decompress the compressed binary data with external code table. The binary still contains its own Huffman code in it but this time, the given Huffman code map will be used to decompress the data. If it fails then it will warn and try to decompress the data with the Huffman code that is stored in the binary. If the data doesn't have it then it will throw an error.

```js
import { decompress } from "@iceylan/huffmanjs";

const decompressed = decompress( compressedBinary, huffmanCodes );
// Hello world!
```
