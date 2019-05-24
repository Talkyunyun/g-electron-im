/**
 *
 *
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/12/27
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
let Helpers = require('./Helper');
let Helper = Helpers.Helper;


class BuffCode {

    encode(content) {
        let buff = Buffer.from(content, 'utf8');
        let buffOc = Buffer.alloc(buff.length + 4);
        Helper.writeInt(buffOc, buff.length);
        Helper.writeBytes(buffOc, buff);

        return buffOc;
    }


    decode(buff) {
        let length = Helper.readInt(buff, 0);
        buff = Helper.readBytes(buff, length)

        return buff.toString();
    }
}


exports.BuffCode = new BuffCode();
