import { Table, Operate } from "../../lib/main";

export default app => {
  app.use(Table)
  app.use(Operate)
}