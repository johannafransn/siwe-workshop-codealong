import { FastifyRequestTypebox, FastifyReplyTypebox } from '@/v1/fastifyTypes';
import { prisma } from '@/db/index';
import { ERRORS } from '@/helpers/errors';
import { SiweMessageInput, VerifySiweMessageInput } from './schema';
import { ERROR404, ERROR500, STANDARD } from '@/helpers/constants';
import { SiweMessage, generateNonce } from 'siwe';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from "jsonwebtoken";



export async function createNonce(
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> {
  try {
    rep.code(STANDARD.SUCCESS).send({ nonce: generateNonce() });
  } catch (error) {
    console.error('Error creating message:', error);
    rep.code(ERROR500.statusCode).send({ msg: ERROR500.message });
  }
}


export async function getAutheticatedData(
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> {
  try {
    rep.code(STANDARD.SUCCESS).send({ data: "Congrats you got the data!" });
  } catch (error) {
    rep.code(ERROR500.statusCode).send({ msg: ERROR500.message });
  }
}

export async function verifySignature(
  req: FastifyRequestTypebox<typeof VerifySiweMessageInput>,
  rep: FastifyReplyTypebox<typeof VerifySiweMessageInput>
): Promise<void> {
  const { message, signature } = req.body;

  console.log(message, signature, 'msg & signature in verify')
  try {
    const siweMessage = new SiweMessage(message);
    if (!siweMessage) {
      console.error('Error instantiating');
      rep.code(ERROR500.statusCode).send({ msg: ERRORS.swieMsgFailed });
    }
    const verify = await siweMessage.verify({ signature });

    if (!verify) {
      console.error('Error verifying');
      rep.code(ERROR500.statusCode).send({ msg: ERRORS.swieMsgFailed });
    }

    else {
      //Create JWT to send back to client
      const token = jwt.sign(verify.data.address, "jwt-secret");
      const existingUser = await findExistingUser(verify.data.address)
      //If existing user exists, update nonce - this nonce is used to identify the session and prevent against replay attacks //
      if (existingUser?.wallet_address) {
        await updateUserNonceAtLogin(verify.data.address, verify.data.nonce)
      } else {
        createUser(verify.data.address, verify.data.nonce)
      }
      rep.code(STANDARD.SUCCESS).send({ data: { verify, signature, jwt: token } });
    }
  } catch (error) {
    console.error('Error verifying message:', error);
    rep.code(ERROR500.statusCode).send({ msg: ERROR500.message });
  }


  //DB HELPER FUNCTIONS:
  async function updateUserNonceAtLogin(publicAddress: string, nonce: string) {
    const updatedNonceUser = await prisma.user.update({
      where: { wallet_address: publicAddress },
      data: {
        nonce: nonce
      },
      select: {
        wallet_address: true,
        nonce: true,
      },
    });
    return updatedNonceUser
  }

  async function findExistingUser(publicAddress: string) {
    const existingUser = await prisma.user.findUnique({
      where: { wallet_address: publicAddress },
      select: {
        wallet_address: true,
        nonce: true,
      },
    });
    return existingUser
  }

  async function createUser(publicAddress: string, nonce: string) {
    const createdUser = await prisma.user.create({
      data: {
        nonce: nonce,
        wallet_address: publicAddress,
      },
    });
    return createdUser
  }




}
