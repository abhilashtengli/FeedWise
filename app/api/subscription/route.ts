import { NextRequest } from "next/server";

export default function POST(req: NextRequest) {
  //Subcribe to paid
  const body = req.json();
  return body;
}
