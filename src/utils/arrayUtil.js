/**
 *
 *
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/01/25
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */

module.exports = {
    /**
     * 对数组正序排序
     * @param arr
     * @param field
     * @return {*}
     */
    sort: function(arr, field) {
        arr.sort(function(a, b) {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            }

            return 0;
        });

        return arr;
    },

    /**
     * 对数组倒序排序
     * @param arr
     * @param field
     * @return {*}
     */
    sortReverse: function(arr, field) {
        arr.sort(function(a, b) {
            if (a[field] > b[field]) {
                return -1;
            } else if (a[field] < b[field]) {
                return 1;
            }

            return 0;
        });

        return arr;
    }
};
