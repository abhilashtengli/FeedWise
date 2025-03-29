import { motion } from "framer-motion";
const BgBox = ({ rowNum }: { rowNum: number }) => {
  return (
    <div>
      <div className="absolute z-20  inset-0 flex overflow-hidden">
        {[...Array(80)].map((_, index) =>
          <motion.div className=" " key={index}>
            {[...Array(rowNum)].map((_, index) =>
              <motion.div
                initial={{
                  rotate: "90deg"
                }}
                animate={{
                  rotate: "90deg"
                }}
                key={index}
                className=" border border-gray-700  w-8 h-8  grid place-content-center"
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BgBox;
