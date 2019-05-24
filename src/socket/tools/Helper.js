/**
 * TCP字节处理工具
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/12/27
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
class Helper {

    readUTF(buf, offset) {
        let len;
        if (!Buffer.isBuffer(buf)) {
            return null;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        if (buf.length <= offset + 2) {
            return null;
        }
        len = buf.readUInt16BE(offset);
        if (buf.length < len + offset) {
            return null;
        }
        offset += 2;
        buf.position = offset + len;

        return buf.toString('utf8', offset, offset + len);
    }

    readBytes(buf, length, offset) {
        if (!Buffer.isBuffer(buf)) {
            return null;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        if (buf.length <= offset) {
            return null;
        }
        buf.position = offset + length;

        return buf.slice(offset, offset + length);
    }

    readInt(buf, offset) {
        if (!Buffer.isBuffer(buf)) {
            return 0;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.position = offset + 4;

        return buf.readInt32BE(offset);
    }

    writeInt(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeInt32BE(value, offset);
        buf.position = offset + 4;
    }

    writeBytes(buf, tbuf, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.write(tbuf.toString(), offset);
        buf.position = offset + tbuf.length;
    }

    readUTFBytes(buf, length, offset) {
        if (!Buffer.isBuffer(buf)) {
            return null;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        if (buf.length <= offset) {
            return null;
        }
        buf.position = offset + length;

        return buf.toString('utf8', offset, offset + length);
    }

    readFixLengthASCII(buf, offset) {
        let len;
        if (!Buffer.isBuffer(buf)) {
            return null;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        if (buf.length <= offset + 2) {
            return null;
        }
        len = buf.readUInt8(offset);
        if (buf.length < len + offset) {
            return null;
        }
        offset += 1;
        buf.position = offset + len;

        return buf.toString('utf8', offset, offset + len);
    }

    readUnsignedShort(buf, offset) {
        if (!Buffer.isBuffer(buf)) {
            return 0;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.position = offset + 2;

        return buf.readUInt16BE(offset);
    }

    readShort(buf, offset) {
        if (!Buffer.isBuffer(buf)) {
            return 0;
        }

        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.position = offset + 2;

        return buf.readInt16BE(offset);
    }

    readUnsignedByte(buf, offset) {
        if (!Buffer.isBuffer(buf)) {
            return 0;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.position = offset + 1;

        return buf.readUInt8(offset);
    }

    readByte(buf, offset) {
        if (!Buffer.isBuffer(buf)) {
            return 0;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.position = offset + 1;

        return buf.readInt8(offset);
    }

    readUnsignedInt(buf, offset) {
        if (!Buffer.isBuffer(buf)) {
            return 0;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.position = offset + 4;

        return buf.readUInt32BE(offset);
    }

    readFloat(buf, offset) {
        if (!Buffer.isBuffer(buf)) {
            return 0;
        }
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.position = offset + 4;

        return buf.readFloatLE(offset);
    }

    readUnsignedIntArray(buf, offset) {
        let a, arr, len;
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        len = buf.readUInt16BE(offset) >>> 2;
        offset += 2;
        arr = [];
        if (len === 0 || len > 1024) {
            buf.position = offset;
            return arr;
        }
        while (len > 0) {
            a = buf.readUInt32BE(offset);
            arr.push(a);
            offset += 4;
            len -= 1;
        }
        buf.position = offset;

        return arr;
    }

    writeUnsignedInt(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeUInt32BE(value, offset);
        buf.position = offset + 4;
    }

    writeFloat(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeFloatLE(value, offset);
        buf.position = offset + 4;
    }

    writeUnsignedShort(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeUInt16BE(value, offset);
        buf.position = offset + 2;
    }

    writeShort(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeInt16BE(value, offset);
        buf.position = offset + 2;
    }

    writeUnsignedByte(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeUInt8(value, offset);
        buf.position = offset + 1;
    }

    writeByte(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeInt8(value, offset);
        buf.position = offset + 1;
    }

    writeBoolean(buf, value, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        value = value ? 1 : 0;
        buf.writeInt8(value, offset);
        buf.position = offset + 1;
    }

    writeFixLengthASCII(buf, str, maxNumOfChar, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.writeUInt8(maxNumOfChar, offset);
        offset += 1;
        buf.fill(0x20, offset, offset + maxNumOfChar);
        buf.write(str, offset, maxNumOfChar, 'ascii');
        buf.position = offset + maxNumOfChar;
    }

    writeFixLengthUTF(buf, str, maxNumOfChar, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        maxNumOfChar *= 6;
        buf.writeUInt16BE(maxNumOfChar, offset);
        offset += 2;
        buf.fill(0x20, offset, offset + maxNumOfChar);
        buf.write(str, offset, maxNumOfChar, 'utf8');
        buf.position = offset + maxNumOfChar;
    }

    writeUTF(buf, str, offset) {
        let byteLength;
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        byteLength = Buffer.byteLength(str);
        buf.writeUInt16BE(byteLength, offset);
        offset += 2;
        buf.write(str, offset);
        buf.position = offset + byteLength;
    }

    writeUTFBytes(buf, str, offset) {
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        buf.write(str, offset);
        buf.position = offset + Buffer.byteLength(str);
    }

    writeUTFArray(buf, strArray, offset) {
        let byteLength, str, _i, _len;
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        if (!((strArray != null) && strArray.length > 0)) {
            buf.writeUInt16BE(0, offset);
            buf.position = offset + 2;
            return;
        }
        buf.writeUInt16BE(strArray.length, offset);
        offset += 2;
        for (_i = 0, _len = strArray.length; _i < _len; _i++) {
            str = strArray[_i];
            byteLength = Buffer.byteLength(str);
            buf.writeUInt16BE(byteLength, offset);
            offset += 2;
            buf.write(str, offset);
            offset += byteLength;
        }
        return buf.position = offset;
    }

    getByteLengthOfUTFArray(strArray) {
        let len, str, _i, _len;
        len = 2;
        if (!((strArray != null) && strArray.length > 0)) {
            return len;
        }
        for (_i = 0, _len = strArray.length; _i < _len; _i++) {
            str = strArray[_i];
            len = len + 2 + Buffer.byteLength(str);
        }
        return len;
    }

    writeUnsignedIntArray(buf, arr, fixedLength, offset) {
        let i, n, _i, _len;
        if (fixedLength == null) {
            fixedLength = -1;
        }
        arr = arr || [];
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        n = arr.length;
        if (fixedLength > 0 && fixedLength !== n) {
            if (fixedLength < n) {
                arr = arr.slice(0, fixedLength);
            } else {
                arr = arr.concat();
                arr.length = fixedLength;
            }
            n = fixedLength;
        }
        n = n << 2;
        buf.writeUInt16BE(n, offset);
        offset += 2;
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
            i = arr[_i];
            buf.writeUInt32BE(parseInt(i, 10) || 0, offset);
            offset += 4;
        }
        buf.position = offset;
    }

    getByteLengthOfIntArray(arr) {
        return (arr.length << 2) + 2;
    }

    writeUnsignedShortArray(buf, arr, fixedLength, offset) {
        let i, n, _i, _len;
        if (fixedLength == null) {
            fixedLength = -1;
        }
        arr = arr || [];
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        n = arr.length;
        if (fixedLength > 0 && fixedLength !== n) {
            if (fixedLength < n) {
                arr = arr.slice(0, fixedLength);
            } else {
                arr = arr.concat();
                arr.length = fixedLength;
            }
            n = fixedLength;
        }
        n = n << 1;
        buf.writeUInt16BE(n, offset);
        offset += 2;
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
            i = arr[_i];
            buf.writeUInt16BE(parseInt(i, 10) || 0, offset);
            offset += 2;
        }
        buf.position = offset;
    }

    getBytesAvailable(buf) {
        if (buf != null) {
            return buf.length - (buf.position || 0);
        } else {
            return 0;
        }
    }

    scrap(buf, length) {
        let offset, result;
        if (!((buf != null) && length > 0)) {
            return null;
        }
        offset = buf.position || 0;
        if (length + offset > buf.length) {
            return null;
        }
        result = Buffer.alloc(length);
        buf.copy(result, 0, offset, offset + length);
        buf.position = offset + length;
        return result;
    }

    duplicate(buf) {
        let n, result;
        n = buf.length || 0;
        if (n === 0) {
            return null;
        }
        result = Buffer.alloc(n);
        buf.copy(result, 0, 0, n);
        return result;
    }

    utfStringToBuf(str) {
        let buf, n;
        str = String(str || '');
        n = Buffer.byteLength(str, 'utf8');
        buf = Buffer.alloc(n + 2);
        buf.writeUInt16BE(n, 0);
        buf.write(str, 2);
        return buf;
    }

    isAvailableBuf(buf) {
        return Buffer.isBuffer(buf) && buf.length > 0;
    }

    writeIntArray(buf, arr, fixedLength, offset) {
        let i, n, _i, _len;
        if (fixedLength == null) {
            fixedLength = -1;
        }
        arr = arr || [];
        offset = offset < 0 ? buf.length + offset : (offset === 0 ? 0 : offset || buf.position || 0);
        n = arr.length;
        if (fixedLength > 0 && fixedLength !== n) {
            if (fixedLength < n) {
                arr = arr.slice(0, fixedLength);
            } else {
                arr = arr.concat();
                arr.length = fixedLength;
            }
            n = fixedLength;
        }
        n = n << 2;
        buf.writeUInt16BE(n, offset);
        offset += 2;
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
            i = arr[_i];
            buf.writeInt32BE(parseInt(i, 10) || 0, offset);
            offset += 4;
        }
        buf.position = offset;
    }
}

exports.Helper = new Helper();


