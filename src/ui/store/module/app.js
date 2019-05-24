/**
 * 全局状态树管理
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/02/27
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
let IM = window.IM;
let state = {
    isConnect: false, // 连接状态

    // 当前登录用户信息
    current: {
        user: false,
        node: false
    },

    // 所有会话列表[左侧显示]
    session: [],

    // 当前选择会话相关信息
    currentSession: {
        msgList: [],
        session: {}  // 当前焦点会话
    }
};
const getters = {
    getCurrentUser: state => state.current.user, // 获取当前登录用户信息
    getCurrentNode: state => state.current.node, // 获取当前登录TCP服务节点信息
    getSession : state => state.session,  // 获取左侧所有会话列表数据
    getCurrentSessionMsgList: state => state.currentSession.msgList, // 获取当前选中会话聊天列表数据信息
    getCurrentSessionInfo: state => state.currentSession.session, // 获取当前选中会话信息
};
const actions = {};
/** 更改state时间集合 */
const mutations = {
    // 设置当前用户信息
    setCurrentUser(state, data) {
        state.current.user = data;
    },
    // 设置当前登录节点信息
    setCurrentNode(state, data) {
        state.current.node = data;
    },
    /** 设置连接状态 */
    setConnect(state, value) {
        state.isConnect = value;
    },

    /** 设置会话数据 */
    setSession(state, data) {
        // todo 会话列表排序
        let list = data.sort();

        state.session = data;
    },

    /**
     * 设置当前会话列表数据
     * 1、合并数组
     * 2、对新数组重新排序
     * @param state
     * @param data
     */
    setCurrentSessionMsgList(state, data) {
        let newData = data.concat(state.currentSession.msgList);
        newData = IM.utils.arrayUtil.sort(newData, 'sendTime');

        state.currentSession.msgList = newData;
    },

    /**
     * 会话切换，需要清空之前的聊天数据
     * @param state
     * @param data
     */
    setCurrentSession(state, data) {
        state.currentSession.msgList = [];
        state.currentSession.session = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}


