import axios from "axios";

class BoardService {
  constructor() {
  }

  /**
   *
   */
  getDefaults() {
    return axios.get("/api/board/defaults")
  }
}

export default BoardService;