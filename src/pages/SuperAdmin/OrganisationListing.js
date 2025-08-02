import { Tabs, Table, Spin } from "antd";
import { useEffect, useState } from "react";
import { organizationlisting } from "../../services/organisationListingService";

const { TabPane } = Tabs;

const OrganisationListing = () => {
  const [status, setStatus] = useState("PENDING");
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const data = await organizationlisting(status);
      setListing(data);
    } catch (err) {
      console.error("Error fetching organizations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [status]);

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "organization_name",
      key: "organization_name",
    },
    {
      title: "Short Name",
      dataIndex: "org_short_name",
      key: "org_short_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "application_status",
      key: "application_status",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <>
      <div className="pageCss">
        <Tabs defaultActiveKey="PENDING" onChange={setStatus}>
          <TabPane tab="PENDING" key="PENDING" />
          <TabPane tab="APPROVED" key="APPROVED" />
          <TabPane tab="REJECTED" key="REJECTED" />
        </Tabs>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Spin tip="Loading organization data..." />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={listing}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>
    </>
  );
};

export default OrganisationListing;
