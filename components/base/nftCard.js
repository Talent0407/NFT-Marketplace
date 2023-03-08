export default function NftCard({ nftData, setOpen }) {
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      className="cursor-pointer flex flex-col justify-between w-[270px] h-auto bg-white bg-opacity-5 border-white border border-opacity-70 rounded-2xl p-4 hover:scale-105 hover:border-blue-600"
      onClick={handleOpen}
    >
      <div className="w-full aspect-square pb-4">
        <img src={nftData.tokenMediaUrl} className="w-full rounded-lg" />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-white">
          {nftData.tokenName}#{nftData.tokenId}
        </div>
        <div className="text-white">{nftData.tokenPrice}ETH</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-white">collection Name:</div>
        <div className="text-white">{nftData.collectionName}</div>
      </div>
    </div>
  );
}
