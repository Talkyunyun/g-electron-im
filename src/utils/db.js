/**
 * 数据库操作
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/01/02
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
module.exports = {
    /**
     * 初始化数据和表
     * db.user.add({uid: 1, enName: 'gene.yang', cnName: '杨云'});
     */
    initDatabase() {
        let db = new Dexie('db_im');

        // 初始化表操作
        db.version(1).stores({
            user : 'uid,enName,cnName,avatar,email',
            group: 'groupId,name,avatar',
            apps : 'appId,name',
            session: 'targetId, name, avatar, sendTime', // 会话表
            message: ''  // 消息聊天表
        });
    }
};



