interface roleType {
    [key: string]: string;
}

export const roleLevel: roleType = {
    '-1': '未知',
    0: '管理员',
    1: '助教',
    2: '讲师',
    3: '副教授',
    4: '教授',
    5: '硕士',
    6: '硕士',
    7: '博士',
}