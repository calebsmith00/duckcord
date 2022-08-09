import { NextApiRequest, NextApiResponse } from "next";
import { auth, store } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";

const validateBody = (body: any) => {
  if (body === undefined) return false;
  if (typeof body === "string") return false;

  for (const index in body) {
    if (body[index] === undefined || body[index] === "") return false;
  }

  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isValidBody = validateBody(req.body);

  if (isValidBody) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password
      );

      if (userCredential.user) {
        const usersRef = collection(store, "users");
        const email = userCredential.user.email;
        const getDefaultDisplayName = email?.substring(0, email.indexOf("@"));

        const lookForExisting = await getDocs(usersRef);
        lookForExisting.forEach((doc) => {
          if (doc.data().uid === userCredential.user.uid)
            return res.status(200).json({ success: false });
        });
        const addUser = await addDoc(usersRef, {
          socketId: req.body.socketId,
          uid: userCredential.user.uid,
          nickname: userCredential.user.displayName || getDefaultDisplayName,
          avatar: "",
          created_at: new Date(),
          created_by: userCredential.user.displayName || getDefaultDisplayName,
          updated_at: new Date(),
          updated_by: userCredential.user.displayName || getDefaultDisplayName,
        });

        return res.status(200).json(userCredential);
      }
    } catch (e) {
      console.log(`Couldn't get userCredential ${e}`);
    }
  }
  res.status(200).json({ success: true });
}
