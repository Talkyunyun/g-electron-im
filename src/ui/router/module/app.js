/**
 * 系统管理路由
 * @author Gene
 */
// 登录路由配置
const Main = resolve => require(['../../components/Main'], resolve);
const Login = resolve => require(['../../page/Login'], resolve);


// 主页面路由配置
const IMMain = resolve => require(['../../components/IMMain'], resolve);
const Chat = resolve => require(['../../page/chat/Chat'], resolve);
const Home = resolve => require(['../../page/home/Home'], resolve);
const Contact = resolve => require(['../../page/contact/Contact'], resolve);
const Apps = resolve => require(['../../page/apps/Apps'], resolve);
const Setting = resolve => require(['../../page/setting/Setting'], resolve);
export default [
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'login',
                component: Login,
                meta: {title: '登录页面'}
            }
        ]
    },

    {
        path: '/',
        component: IMMain,
        children: [
            {
                path: 'home',
                component: Home,
                meta: {title: 'IM首页'}
            },
            {
                path: 'chat',
                component: Chat,
                meta: {title: 'IM首页'}
            },
            {
                path: 'contact',
                component: Contact,
                meta: {title: '联系人页面'}
            },
            {
                path: 'apps',
                component: Apps,
                meta: {title: 'IM首页'}
            },
            {
                path: 'setting',
                component: Setting,
                meta: {title: '设置页面'}
            }
        ]
    }
];
