import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Router from "next/router";
import { useMediaQuery } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  // background: "#0F172A",
  borderRadius: "20px",
  // bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

export default function DetailModal({
  nftData,
  openModal = false,
  onClose = () => {},
}) {
  const isPhoneMode = useMediaQuery("(max-width:900px)");
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return isPhoneMode && openModal ? (
    <div className="min-h-screen ml-[2px] mt-[67px] bg-white bg-cover w-full z-20"></div>
  ) : (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="w-11/12 sm:w-4/5  bg-[#ced1d8]">
        <div className="relative">
          <div
            className="cursor-pointer absolute top-0 right-0 scale-150"
            onClick={onClose}
          >
            <img src="/images/closeIcon.svg"></img>
          </div>
          <div className="w-full flex flex-row gap-4">
            <div className="w-1/2 p-4">
              <img src={nftData.tokenMediaUrl} className="w-full" />
            </div>
            <div className="w-1/2 flex flex-col gap-4 p-4">
              <div className="text-2xl text-[#196480]">
                {nftData.tokenName}#{nftData.tokenId}
              </div>
              <div className="flex flex-row gap-4">
                <div className="text-xl text-[#196480]">TokenPrice:</div>
                <div className="text-xl text-[#196480]">
                  {nftData.tokenPrice}ETH
                </div>
              </div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                className="text-base font-bold text-[#196480]  text-left bg-gray-50 rounded-md"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{ width: "33%", flexShrink: 0 }}
                    className="text-lg font-bold text-[#196480]"
                  >
                    Descriptions
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{nftData.description}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                className="text-base font-bold text-[#196480]  text-left bg-gray-50 rounded-md"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{ width: "33%", flexShrink: 0 }}
                    className="text-lg font-bold text-[#196480]"
                  >
                    Attributes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="w-full flex flex-wrap justify-around gap-2">
                    {nftData?.attributes?.map((item, index) => {
                      return (
                        <div
                          className="w-1/4 border border-blue-400 rounded-md flex flex-col  items-center p-2"
                          key={index}
                        >
                          <div className="text-black">{item.trait_type}</div>
                          <div className="text-center">{item.value}</div>
                        </div>
                      );
                    })}
                    {Array(2)
                      .fill(0)
                      .map((_, i) => (
                        <div className="w-1/4 h-0" key={i} />
                      ))}
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                className="text-base font-bold text-[#196480]  text-left bg-gray-50 rounded-md"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{ width: "33%", flexShrink: 0 }}
                    className="text-lg font-bold text-[#196480]"
                  >
                    Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <div className="flex flex-row justify-between items-center">
                      <div>Contract Address</div>
                      <div>
                        {nftData?.contractAddress?.substr(0, 6)}...
                        {nftData?.contractAddress?.substr(-6)}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div>Token ID</div>
                      <div>{nftData?.tokenId}</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div>Token Standard</div>
                      <div>{nftData?.tokenType}</div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              <div
                className="bg-blue-700 rounded-md w-full py-4 text-center text-white text-xl cursor-pointer"
                onClick={() => {
                  Router.push(
                    `https://opensea.io/assets/ethereum/${nftData.contractAddress}/${nftData.tokenId}`
                  );
                }}
              >
                Purchase
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
