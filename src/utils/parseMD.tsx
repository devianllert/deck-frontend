import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

const parser = unified()
  .use(parse)
  .use(remark2react, {
    remarkReactComponents: {
      p: ({ children }) => <>{children}</>,
    }
  });

export const parseMD = (string: string) => {
  return parser.processSync(string).result;
};
