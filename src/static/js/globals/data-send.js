class Sender {
  async post(url = "", body = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      
      return response.json();
    }
    catch (err) {
      return err;
    }
  }

  async get(url) {
    try {
      const response = await fetch(url);
      return response.json();
    }
    catch (err) {
      return err;
    }
  }
};

const sender = new Sender();
export default sender;