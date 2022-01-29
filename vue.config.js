module.exports = {
    pages: {
        index: {
            entry: "src/main.ts",
            title: "JD Music",
        },
    },
    devServer: {
        overlay: {
            warnings: true,
            errors: true,
        },
    },
};
