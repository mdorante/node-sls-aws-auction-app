import createError from "http-errors";
import { closeAuction } from "../lib/closeAuction";
import { getEndedAuctions } from "../lib/getEndedAuctions";

async function processAuctions() {
  try {
    const auctionsToClose = await getEndedAuctions();
    const closePromises = auctionsToClose.map((auction) =>
      closeAuction(auction)
    );
    await Promise.all(closePromises); // awaits all closeAuction promises and executes them all at once

    return { closed: closePromises.length }; // returns the number of auctions that have been closed
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = processAuctions;
