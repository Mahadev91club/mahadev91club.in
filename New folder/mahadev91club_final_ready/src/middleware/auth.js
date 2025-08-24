const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign({ uid: user._id, admin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login?next=' + encodeURIComponent(req.originalUrl));
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.uid);
    if (!user) return res.clearCookie('token').redirect('/login');
    req.user = user;
    next();
  } catch (e) {
    return res.clearCookie('token').redirect('/login');
  }
}

async function requireAdmin(req, res, next) {
  await requireAuth(req, res, async () => {
    if (!req.user.isAdmin) return res.status(403).render('error', { title: 'Forbidden', message: 'Admin only' });
    next();
  });
}

module.exports = { signToken, requireAuth, requireAdmin };
