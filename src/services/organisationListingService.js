// api/organization.js
import axios from "axios";
import { BACKEND_URL } from "../assets/constants";

const token = localStorage.getItem("token");

export const organizationlisting = async (status) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/admin/newApplication/getApplications/${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching organization listing:", error);
    throw error;
  }
};
