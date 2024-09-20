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
íce9$ !Hdelo
rwíSºí
```

##### Magic Bytes
The first 4 bytes `íce9` of the binary data is the magic bytes of the library which we can easily change to any length of something else we want from `lib/constants.js` file.

##### Zero Padding
Next byte indicates the length of the zero padding that added to the encoded data's latest byte to complete it to 8 bits. It was a number from `0` to `7` and we used it as a decimal character code and put there its corresponding character. So, we can easily decode it with `"".charCodeAt(0)` method.

##### Meta Datas
Next 2 bytes are encoded form of the length of the serialized (encoded) huffman codes. 16 bit can hold 1 to 65536 numbers. That means as long as the huffman table does not exceed the 64 kilobyte limit, there is no problem.

##### Huffman Codes
It uses fixed length byte allocation technique to encode the Huffman codes. After encoding, every `{decimal:binary string}` pair lives in 32 bit capacity.

That means if we split encoded form of the huffman codes into 4 bytes chunks, every chunk of it will give us an entry of the huffman map.

When the library start to compress the data, it handles all the character that used in the raw data with their decimal representation and starts to calculate their frequency and it stack them in a map with their decimal representation and frequency. That allows the library to handle multibyte characters like emojis or chinese characters.

Library allocates 16 bits for the decimal representation of the character which it can be 0 to 65535. It encodes them into binary form and adds the missing bits at the start as zeros to complete it to 16 and split those bits into 8 bits chunks. After that, it convert them into 256 based Extended ASCII characters. So, at the decompression stage, the first 2 byte of the chunk will give us a char code.

After that, the library allocates 16 bit for the huffman code that calculated for the character. Huffman codes mostly uses 1-13 bits which 16 was fair enough. Since we have some bits, library will just add missed bits at the start as zeros to complete it to 16 bits. After that, it converts them into extended ASCII characters. So, at the decompression stage, the latest 2 byte of the chunk will give us the huffman code of the character.

We repeat this process until we consume all the 4 byte chunks to decode the huffman codes.

##### Compressed Data
And the latest 5 bytes `íSºí` represents the compressed form of `Hello world!`. To decode it, we need to convert every decoded characters to decimal numbers. Then we need to convert decimal numbers to binary form. Then we need to remove the padding zeros (remember, we got the numbers of the added zeros from next byte of the magic bytes). And finally, we can start search the Huffman codes in that bit stack. If we find the huffman code, we can replace it with the character. At the end, we would get the original data.

#### Serialization and Deserialization of the Huffman Codes
Huffman codes is a map to convert characters into ones and the zeros as string and backwards. After the library calculates the huffman code for all the characters in the original data, it converts characters into short huffman codes. Then it divide them into groups of 8 and reencode them into decimals and the decimals into characters. The easiest way to get the original data from the compressed data is use this map.

Calculated Huffman codes will look like this:
```js
{
	108: "110",
	101: "1111",
	111: "1010",
	114: "1110",
	119: "1011",
	32: "10011",
	33: "10010",
	72: "10001",
	100: "10000"
}
```

Even if we remove the whitespaces it could use 120 bytes. But the library provides Huffman code serialization and deserialization ability. If we want to store the code table in the somewhere else rather than the binary data, we can serialize it to save some space.

```js
import { serializeHuffmanCode } from "@iceylan/huffmanjs";

const serialized = serializeHuffmanCode( huffmanCodes );
```

```
 !Hdelo
rw
```

and the length will be (9 entry x 32 bits = 288 bits = 36 bytes).

We can deserialize the code table and use the result to pass decompress method to decompress the headless compressed binary data.

```js
import { unserializeHuffmanCode } from "@iceylan/huffmanjs";

const unserialized = unserializeHuffmanCode( serialized );
```

Result will be an object that looks the same as the original huffman code and `decompress` method will accept it to decompress the binary data.

### Decompression
We can easily decompress the compressed binary data.

#### Standalone Decompression
With this scenario, we can decompress the compressed binary data without huffman code map. The binary has it's own Huffman code in it so it can decompress itself.

```js
import { decompress } from "@iceylan/huffmanjs";

const decompressed = decompress( compressedBinary );
// Hello world!
```

#### Decompression with External Code Table
With this scenario, we can decompress the compressed binary data with external code table. The binary will be allowed to contain its own Huffman code in it but this time, externally given Huffman code map will be used to decompress the data. If it fails then it will warn and try to decompress the data with the Huffman code that is stored in the binary. If the binary doesn't have it then it will throw an error.

```js
import { decompress } from "@iceylan/huffmanjs";

const decompressed = decompress( compressedBinary, unserialized );
// Hello world!
```
