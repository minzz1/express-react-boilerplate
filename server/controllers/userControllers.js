import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postJoin = async (req, res) => {
  const { username, name, mobile, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      name,
      mobile,
      email,
      password,
      auth: 2,
      createdAt: Date.now(),
    });
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "에러가 발생했습니다" });
  }
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ ok: false, message: "로그인 실패!" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ ok: false, message: "로그인 실패!!" });
  }

  try {
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });

    return res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "로그인 실패!!!" });
  }
};

export const loginSuccess = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    console.log(accessToken);

    const tempData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    const id = tempData?.id;

    const loggedInUser = await User.findById(id);
    const { username, mobile, email, name, auth } = loggedInUser;

    return res.status(200).json({
      ok: true,
      username,
      mobile,
      email,
      name,
      auth,
      id:_id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false });
  }
};

export const postAddMinssion = async (req, res) => {
  try{
    //req.body.userId
    //req.body.missionId
    const { body: { userId, missionId}} = req

    const existing = await User.findById(userId)
    if(!existing){
      return res.json({ result: 1, message:"로그인 정보가 없습니다."})
    }

    //이미 완료된 QR코드 일때 
    if(existing.missionCompleted.includes(missionId)){
      return res.json({result:3, message: "인증완료된 QR코드입니다."})
    }

    //에러처리 정해진 QR코드가 아닐때 에러처리
    const qrData = ["sun","rain","cloudy"]
    if(!qrData.includes(missionId)){
      return res.json({result:2, message: "유효하지 않은 QR코드입니다."})
    }

    const updatedUser = await User.updateMany({_id: userId}, {missionCompleted: missionId})

    return res.status(200).json({result: 0, message: "QR 인증성공", updatedUser})
  }catch{
    console.log(error)
  }
}
