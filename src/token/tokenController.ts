import { ethers } from 'ethers';
import { NextFunction, Request, Response } from 'express';
import createApiError from '../utils/createApiError';
import createApiResponse from '../utils/createApiResponse';
import { tokenTransferService } from './tokenService';
const tokenTransfer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { amount, recipient } = req.body;
		if (!amount || !recipient) {
			return createApiError(400, 'Missing required fields', next);
		}

		// Validate recipient address
		if (!ethers.isAddress(recipient)) {
			return createApiError(400, 'Invalid recipient address', next);
		}

		if (isNaN(amount)) {
			return createApiError(400, 'Invalid amount', next);
		}

		console.log('token transfer');
		const txHash = await tokenTransferService(amount, recipient);
		return createApiResponse(
			{ txHash, message: 'Transaction Successful' },
			res
		);
	} catch (error: any) {
		console.error('🚨 ~ Token Transfer Error:', error);
		// Handle specific ethers.js errors
		if (error?.reason) {
			return createApiError(400, error.reason, next);
		}

		if (error.info || error.shortMessage) {
			return createApiError(
				400,
				error.info.message || error.shortMessage || 'Unknown error',
				next
			);
		}

		if (error?.code === 'CALL_EXCEPTION') {
			return createApiError(
				400,
				'Contract call exception: ' + (error.reason || 'Unknown error'),
				next
			);
		}

		// General error fallback
		return createApiError(500, 'Internal Server Error', next);
	}
};

export { tokenTransfer };
