/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./style.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HTMLReactParser from "html-react-parser";
import parse from "html-react-parser";
import { decodeHtml } from "../../helpers/common";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";

const Accordion = ({
  index,
  expanded,
  setExpanded,
  title,
  data,
  mutate,
  refetch,
}) => {
  const isOpen = index === expanded;
  const dispatch = useDispatch();

  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#d78004" : "#1351c0" }}
        onClick={() => setExpanded(isOpen ? null : index)}
        className="flex px-4 py-2 justify-between h-auto"
      >
        <h3>{title}</h3>
        {isOpen ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="accordion-content"
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className="content-placeholder"
            >
              {/* <div>{HTMLReactParser(data.description)}</div> */}
              <div>{parse(decodeHtml(data.description))}</div>
              <button
                onClick={() => {
                  mutate(
                    {
                      _id: data._id,
                      imageName: data.imageName,
                    },
                    {
                      onSuccess: () => {
                        refetch();
                        dispatch(showMessageSuccesss("Xóa thành công!"));
                      },
                      onError: () => {
                        dispatch(showMessageError("Xóa thất bại!"));
                      },
                    }
                  );
                }}
                type="submit"
                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6"
              >
                Xóa
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

const AccordionContainer = ({ data, mutate, refetch }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="w-full">
      {data?.map((item, index) => (
        <div key={index} className="accordion-item">
          <Accordion
            index={index}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item?.name}
            data={item}
            mutate={mutate}
            refetch={refetch}
          />
        </div>
      ))}
    </div>
  );
};

const accordionIds = [0, 1, 2, 3];
export default AccordionContainer;
