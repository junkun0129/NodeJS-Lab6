exports.getLoginPage = (req, res, next) => {
    res.render('index', { title: 'Express Recipes' });
};

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (email === 'hoge@hoge.com' && password === 'hogehoge') {
        res.redirect('/recipes');
    } else {
        res.redirect('/');
    }
}