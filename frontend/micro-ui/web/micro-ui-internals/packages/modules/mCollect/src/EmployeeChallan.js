import { DownloadIcon } from "@egovernments/digit-ui-react-components";
import { Card, CardSubHeader, Header, Row, StatusTable, SubmitBar, ActionBar, Menu, Toast,MultiLink } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { stringReplaceAll, convertEpochToDate } from "./utils";
import ActionModal from "./components/Modal";
import { downloadAndPrintChallan, downloadAndPrintReciept } from "./utils";

const EmployeeChallan = (props) => {
  const { t } = useTranslation();
  const { challanno } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [challanBillDetails, setChallanBillDetails] = useState([]);
  const [totalDueAmount, setTotalDueAmount] = useState(0);

  const [displayMenu, setDisplayMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const history = useHistory();
  const { url } = useRouteMatch();
  const [isDisplayDownloadMenu, setIsDisplayDownloadMenu] = useState(false);
  const [showToast, setShowToast] = useState(null);


  const DownloadBtnImg = () => (
    <svg  width="112" height="32" viewBox="0 0 112 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.3337 12H20.0003V4H12.0003V12H6.66699L16.0003 21.3333L25.3337 12ZM6.66699 24V26.6667H25.3337V24H6.66699Z" fill="#F47738"/>
    <path d="M44.3984 21.5H42.0234L42.0391 20.2734H44.3984C45.2109 20.2734 45.888 20.1042 46.4297 19.7656C46.9714 19.4219 47.3776 18.9427 47.6484 18.3281C47.9245 17.7083 48.0625 16.9844 48.0625 16.1562V15.4609C48.0625 14.8099 47.9844 14.2318 47.8281 13.7266C47.6719 13.2161 47.4427 12.7865 47.1406 12.4375C46.8385 12.0833 46.4688 11.8151 46.0312 11.6328C45.599 11.4505 45.1016 11.3594 44.5391 11.3594H41.9766V10.125H44.5391C45.2839 10.125 45.9635 10.25 46.5781 10.5C47.1927 10.7448 47.7214 11.1016 48.1641 11.5703C48.612 12.0339 48.9557 12.5964 49.1953 13.2578C49.4349 13.9141 49.5547 14.6536 49.5547 15.4766V16.1562C49.5547 16.9792 49.4349 17.7214 49.1953 18.3828C48.9557 19.0391 48.6094 19.599 48.1562 20.0625C47.7083 20.526 47.1667 20.8828 46.5312 21.1328C45.901 21.3776 45.1901 21.5 44.3984 21.5ZM42.8281 10.125V21.5H41.3203V10.125H42.8281ZM51.2188 17.3672V17.1875C51.2188 16.5781 51.3073 16.013 51.4844 15.4922C51.6615 14.9661 51.9167 14.5104 52.25 14.125C52.5833 13.7344 52.987 13.4323 53.4609 13.2188C53.9349 13 54.4661 12.8906 55.0547 12.8906C55.6484 12.8906 56.1823 13 56.6562 13.2188C57.1354 13.4323 57.5417 13.7344 57.875 14.125C58.2135 14.5104 58.4714 14.9661 58.6484 15.4922C58.8255 16.013 58.9141 16.5781 58.9141 17.1875V17.3672C58.9141 17.9766 58.8255 18.5417 58.6484 19.0625C58.4714 19.5833 58.2135 20.0391 57.875 20.4297C57.5417 20.8151 57.138 21.1172 56.6641 21.3359C56.1953 21.5495 55.6641 21.6562 55.0703 21.6562C54.4766 21.6562 53.9427 21.5495 53.4688 21.3359C52.9948 21.1172 52.5885 20.8151 52.25 20.4297C51.9167 20.0391 51.6615 19.5833 51.4844 19.0625C51.3073 18.5417 51.2188 17.9766 51.2188 17.3672ZM52.6641 17.1875V17.3672C52.6641 17.7891 52.7135 18.1875 52.8125 18.5625C52.9115 18.9323 53.0599 19.2604 53.2578 19.5469C53.4609 19.8333 53.7135 20.0599 54.0156 20.2266C54.3177 20.388 54.6693 20.4688 55.0703 20.4688C55.4661 20.4688 55.8125 20.388 56.1094 20.2266C56.4115 20.0599 56.6615 19.8333 56.8594 19.5469C57.0573 19.2604 57.2057 18.9323 57.3047 18.5625C57.4089 18.1875 57.4609 17.7891 57.4609 17.3672V17.1875C57.4609 16.7708 57.4089 16.3776 57.3047 16.0078C57.2057 15.6328 57.0547 15.3021 56.8516 15.0156C56.6536 14.724 56.4036 14.4948 56.1016 14.3281C55.8047 14.1615 55.4557 14.0781 55.0547 14.0781C54.6589 14.0781 54.3099 14.1615 54.0078 14.3281C53.7109 14.4948 53.4609 14.724 53.2578 15.0156C53.0599 15.3021 52.9115 15.6328 52.8125 16.0078C52.7135 16.3776 52.6641 16.7708 52.6641 17.1875ZM62.8672 20L65.0391 13.0469H65.9922L65.8047 14.4297L63.5938 21.5H62.6641L62.8672 20ZM61.4062 13.0469L63.2578 20.0781L63.3906 21.5H62.4141L59.9609 13.0469H61.4062ZM68.0703 20.0234L69.8359 13.0469H71.2734L68.8203 21.5H67.8516L68.0703 20.0234ZM66.2031 13.0469L68.3281 19.8828L68.5703 21.5H67.6484L65.375 14.4141L65.1875 13.0469H66.2031ZM74.2031 14.8516V21.5H72.7578V13.0469H74.125L74.2031 14.8516ZM73.8594 16.9531L73.2578 16.9297C73.263 16.3516 73.349 15.8177 73.5156 15.3281C73.6823 14.8333 73.9167 14.4036 74.2188 14.0391C74.5208 13.6745 74.8802 13.3932 75.2969 13.1953C75.7188 12.9922 76.1849 12.8906 76.6953 12.8906C77.112 12.8906 77.487 12.9479 77.8203 13.0625C78.1536 13.1719 78.4375 13.349 78.6719 13.5938C78.9115 13.8385 79.0938 14.1562 79.2188 14.5469C79.3438 14.9323 79.4062 15.4036 79.4062 15.9609V21.5H77.9531V15.9453C77.9531 15.5026 77.888 15.1484 77.7578 14.8828C77.6276 14.612 77.4375 14.4167 77.1875 14.2969C76.9375 14.1719 76.6302 14.1094 76.2656 14.1094C75.9062 14.1094 75.5781 14.1849 75.2812 14.3359C74.9896 14.487 74.737 14.6953 74.5234 14.9609C74.3151 15.2266 74.151 15.5312 74.0312 15.875C73.9167 16.2135 73.8594 16.5729 73.8594 16.9531ZM83.1719 9.5V21.5H81.7188V9.5H83.1719ZM85.1094 17.3672V17.1875C85.1094 16.5781 85.1979 16.013 85.375 15.4922C85.5521 14.9661 85.8073 14.5104 86.1406 14.125C86.474 13.7344 86.8776 13.4323 87.3516 13.2188C87.8255 13 88.3568 12.8906 88.9453 12.8906C89.5391 12.8906 90.0729 13 90.5469 13.2188C91.026 13.4323 91.4323 13.7344 91.7656 14.125C92.1042 14.5104 92.362 14.9661 92.5391 15.4922C92.7161 16.013 92.8047 16.5781 92.8047 17.1875V17.3672C92.8047 17.9766 92.7161 18.5417 92.5391 19.0625C92.362 19.5833 92.1042 20.0391 91.7656 20.4297C91.4323 20.8151 91.0286 21.1172 90.5547 21.3359C90.0859 21.5495 89.5547 21.6562 88.9609 21.6562C88.3672 21.6562 87.8333 21.5495 87.3594 21.3359C86.8854 21.1172 86.4792 20.8151 86.1406 20.4297C85.8073 20.0391 85.5521 19.5833 85.375 19.0625C85.1979 18.5417 85.1094 17.9766 85.1094 17.3672ZM86.5547 17.1875V17.3672C86.5547 17.7891 86.6042 18.1875 86.7031 18.5625C86.8021 18.9323 86.9505 19.2604 87.1484 19.5469C87.3516 19.8333 87.6042 20.0599 87.9062 20.2266C88.2083 20.388 88.5599 20.4688 88.9609 20.4688C89.3568 20.4688 89.7031 20.388 90 20.2266C90.3021 20.0599 90.5521 19.8333 90.75 19.5469C90.9479 19.2604 91.0964 18.9323 91.1953 18.5625C91.2995 18.1875 91.3516 17.7891 91.3516 17.3672V17.1875C91.3516 16.7708 91.2995 16.3776 91.1953 16.0078C91.0964 15.6328 90.9453 15.3021 90.7422 15.0156C90.5443 14.724 90.2943 14.4948 89.9922 14.3281C89.6953 14.1615 89.3464 14.0781 88.9453 14.0781C88.5495 14.0781 88.2005 14.1615 87.8984 14.3281C87.6016 14.4948 87.3516 14.724 87.1484 15.0156C86.9505 15.3021 86.8021 15.6328 86.7031 16.0078C86.6042 16.3776 86.5547 16.7708 86.5547 17.1875ZM99.6016 20.0547V15.7031C99.6016 15.3698 99.5339 15.0807 99.3984 14.8359C99.2682 14.5859 99.0703 14.3932 98.8047 14.2578C98.5391 14.1224 98.2109 14.0547 97.8203 14.0547C97.4557 14.0547 97.1354 14.1172 96.8594 14.2422C96.5885 14.3672 96.375 14.5312 96.2188 14.7344C96.0677 14.9375 95.9922 15.1562 95.9922 15.3906H94.5469C94.5469 15.0885 94.625 14.7891 94.7812 14.4922C94.9375 14.1953 95.1615 13.9271 95.4531 13.6875C95.75 13.4427 96.1042 13.25 96.5156 13.1094C96.9323 12.9635 97.3958 12.8906 97.9062 12.8906C98.5208 12.8906 99.0625 12.9948 99.5312 13.2031C100.005 13.4115 100.375 13.7266 100.641 14.1484C100.911 14.5651 101.047 15.0885 101.047 15.7188V19.6562C101.047 19.9375 101.07 20.237 101.117 20.5547C101.169 20.8724 101.245 21.1458 101.344 21.375V21.5H99.8359C99.763 21.3333 99.7057 21.112 99.6641 20.8359C99.6224 20.5547 99.6016 20.2943 99.6016 20.0547ZM99.8516 16.375L99.8672 17.3906H98.4062C97.9948 17.3906 97.6276 17.4245 97.3047 17.4922C96.9818 17.5547 96.7109 17.651 96.4922 17.7812C96.2734 17.9115 96.1068 18.0755 95.9922 18.2734C95.8776 18.4661 95.8203 18.6927 95.8203 18.9531C95.8203 19.2188 95.8802 19.4609 96 19.6797C96.1198 19.8984 96.2995 20.0729 96.5391 20.2031C96.7839 20.3281 97.0833 20.3906 97.4375 20.3906C97.8802 20.3906 98.2708 20.2969 98.6094 20.1094C98.9479 19.9219 99.2161 19.6927 99.4141 19.4219C99.6172 19.151 99.7266 18.888 99.7422 18.6328L100.359 19.3281C100.323 19.5469 100.224 19.7891 100.062 20.0547C99.901 20.3203 99.6849 20.5755 99.4141 20.8203C99.1484 21.0599 98.8307 21.2604 98.4609 21.4219C98.0964 21.5781 97.6849 21.6562 97.2266 21.6562C96.6536 21.6562 96.151 21.5443 95.7188 21.3203C95.2917 21.0964 94.9583 20.7969 94.7188 20.4219C94.4844 20.0417 94.3672 19.6172 94.3672 19.1484C94.3672 18.6953 94.4557 18.2969 94.6328 17.9531C94.8099 17.6042 95.0651 17.3151 95.3984 17.0859C95.7318 16.8516 96.1328 16.6745 96.6016 16.5547C97.0703 16.4349 97.5938 16.375 98.1719 16.375H99.8516ZM108.648 19.8594V9.5H110.102V21.5H108.773L108.648 19.8594ZM102.961 17.3672V17.2031C102.961 16.5573 103.039 15.9714 103.195 15.4453C103.357 14.9141 103.583 14.4583 103.875 14.0781C104.172 13.6979 104.523 13.4062 104.93 13.2031C105.341 12.9948 105.799 12.8906 106.305 12.8906C106.836 12.8906 107.299 12.9844 107.695 13.1719C108.096 13.3542 108.435 13.6224 108.711 13.9766C108.992 14.3255 109.214 14.7474 109.375 15.2422C109.536 15.737 109.648 16.2969 109.711 16.9219V17.6406C109.654 18.2604 109.542 18.8177 109.375 19.3125C109.214 19.8073 108.992 20.2292 108.711 20.5781C108.435 20.9271 108.096 21.1953 107.695 21.3828C107.294 21.5651 106.826 21.6562 106.289 21.6562C105.794 21.6562 105.341 21.5495 104.93 21.3359C104.523 21.1224 104.172 20.8229 103.875 20.4375C103.583 20.0521 103.357 19.599 103.195 19.0781C103.039 18.5521 102.961 17.9818 102.961 17.3672ZM104.414 17.2031V17.3672C104.414 17.7891 104.456 18.1849 104.539 18.5547C104.628 18.9245 104.763 19.25 104.945 19.5312C105.128 19.8125 105.359 20.0339 105.641 20.1953C105.922 20.3516 106.258 20.4297 106.648 20.4297C107.128 20.4297 107.521 20.3281 107.828 20.125C108.141 19.9219 108.391 19.6536 108.578 19.3203C108.766 18.987 108.911 18.625 109.016 18.2344V16.3516C108.953 16.0651 108.862 15.7891 108.742 15.5234C108.628 15.2526 108.477 15.013 108.289 14.8047C108.107 14.5911 107.88 14.4219 107.609 14.2969C107.344 14.1719 107.029 14.1094 106.664 14.1094C106.268 14.1094 105.927 14.1927 105.641 14.3594C105.359 14.5208 105.128 14.7448 104.945 15.0312C104.763 15.3125 104.628 15.6406 104.539 16.0156C104.456 16.3854 104.414 16.7812 104.414 17.2031Z" fill="#F47738"/>
    </svg>
  );

  const DownloadBtn = (props) => {
    return (
      <div>
        <DownloadBtnImg />
      </div>
    );
  };
  useEffect(() => {
    switch (selectedAction) {
      case "CANCEL_CHALLAN":
        return setShowModal(true);
      case "UPDATE_CHALLAN":
        return history.push(`/digit-ui/employee/mcollect/modify-challan/${challanno}`);
      case "BUTTON_PAY":
        return history.push(
          `/digit-ui/employee/payment/collect/${challanDetails?.businessService}/${challanno}/tenantId=${tenantId}?workflow=mcollect`
        );
      default:
        break;
    }
  }, [selectedAction]);

  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }

  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };

  const submitAction = (data) => {
    Digit.MCollectService.update({ Challan: data?.Challan }, tenantId)
      .then((result) => {
        if (result.challans && result.challans.length > 0) {
          const challan = result.challans[0];
          let LastModifiedTime = Digit.SessionStorage.set("isMcollectAppChanged", challan.challanNo);
          history.push(
            `/digit-ui/employee/mcollect/acknowledgement?purpose=challan&status=success&tenantId=${challan?.tenantId}&serviceCategory=${challan.businessService}&challanNumber=${challan.challanNo}&applicationStatus=${challan.applicationStatus}`,
            { from: url }
          );
        }
      })
      .catch((e) => setShowToast({ key: true, label: e?.response?.data?.Errors[0].message }));
    closeModal();
  };

  let isMcollectAppChanged = Digit.SessionStorage.get("isMcollectAppChanged");

  const { isLoading, isError, error, data, ...rest } = Digit.Hooks.mcollect.useMCollectSearch({
    tenantId,
    filters: { challanNo: challanno },
    isMcollectAppChanged,
  });
  var challanDetails = data?.challans?.filter(function (item) {
    return item.challanNo === challanno;
  })[0];
  let billDetails = [];
  useEffect(() => {
    async function fetchMyAPI() {
      billDetails = [];
      let res = await Digit.PaymentService.searchBill(tenantId, {
        consumerCode: data?.challans[0]?.challanNo,
        service: data?.challans[0]?.businessService,
      });
      res?.Bill[0]?.billDetails[0]?.billAccountDetails?.map((bill) => {
        billDetails.push(bill);
      });
      setTotalDueAmount(res?.Bill[0]?.totalAmount);
      billDetails && billDetails.map((ob) => {
        if(ob.taxHeadCode.includes("CGST"))
          ob.order = 3;
        else if(ob.taxHeadCode.includes("SGST"))
          ob.order = 4;
      });
      billDetails.sort((a, b) => a.order - b.order);
      setChallanBillDetails(billDetails);
    }
    if (data?.challans && data?.challans?.length > 0) {
      fetchMyAPI();
    }
  }, [data]);

  const workflowActions = ["CANCEL_CHALLAN", "UPDATE_CHALLAN", "BUTTON_PAY"];

  function onDownloadActionSelect(action) {
    action == "CHALLAN" ? downloadAndPrintChallan(challanno) : downloadAndPrintReciept(challanDetails?.businessService, challanno);
  }

  return (
    <React.Fragment>
      <div style={{ width: "100%", fontFamily: "calibri", color: "#FF0000", display: "flex", justifyContent: "space-between" }}>
        <Header>{`${t("CHALLAN_DETAILS")}`} </Header>
        <div>
          {/* <SubmitBar label={t("TL_DOWNLOAD")} onSubmit={() => setIsDisplayDownloadMenu(!isDisplayDownloadMenu)} /> */}
          <MultiLink
                  className="multilink-block-wrapper"
                  // label={t(`ES_DSS_DOWNLOAD`)}
                  icon={<DownloadBtn  />}
                  onHeadClick={() => setIsDisplayDownloadMenu(!isDisplayDownloadMenu)}
                  displayOptions={isDisplayDownloadMenu}
                  options={challanDetails?.applicationStatus === "PAID" ? ["CHALLAN", "RECEIPT"] : ["CHALLAN"]}
                />
          {isDisplayDownloadMenu ? (
            <div
              style={{
                boxShadow: "0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%), 0 5px 5px -3px rgb(0 0 0 / 20%)",
                height: "auto",
                backgroundColor: "#fff",
                textAlign: "left",
                marginBottom: "4px",
                width: "240px",
                padding: "0px 10px",
                lineHeight: "30px",
                cursor: "pointer",
                position: "absolute",
                color: "black",
                fontSize: "18px",
              }}
            >
              <Menu
                localeKeyPrefix="UC"
                options={challanDetails?.applicationStatus === "PAID" ? ["CHALLAN", "RECEIPT"] : ["CHALLAN"]}
                t={t}
                onSelect={onDownloadActionSelect}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <Card>
          <StatusTable style={{ padding: "10px 0px" }}>
            <Row label={`${t("UC_CHALLAN_NO")}:`} text={challanno} />
            <hr style={{ width: "35%", border: "1px solid #D6D5D4", marginTop: "1rem", marginBottom: "1rem" }} />
            {challanBillDetails?.map((data) => {
              return (
                <Row label={t(stringReplaceAll(data?.taxHeadCode, ".", "_"))} text={`₹${data?.amount}` || 0} textStyle={{ whiteSpace: "pre" }} />
              );
            })}
            <hr style={{ width: "35%", border: "1px solid #D6D5D4", marginTop: "1rem", marginBottom: "1rem" }} />
            <Row
              label={<b style={{ padding: "10px 0px" }}>{t("UC_TOTAL_DUE_AMOUT_LABEL")}</b>}
              text={`₹${totalDueAmount}`}
              textStyle={{ fontSize: "24px", padding: "10px 0px", fontWeight: "700" }}
            />
          </StatusTable>
          <div style={{ fontSize: "24px", padding: "10px 0px", fontWeight: "700" }}>{t("UC_SERVICE_DETAILS_LABEL")}</div>
          <StatusTable>
            <Row
              label={`${t("UC_SERVICE_CATEGORY_LABEL")}:`}
              text={`${t(`BILLINGSERVICE_BUSINESSSERVICE_${stringReplaceAll(challanDetails?.businessService?.toUpperCase(), ".", "_")}` || t("CS_NA"))}`}
              textStyle={{ whiteSpace: "pre" }}
            />
            <Row label={`${t("UC_FROM_DATE_LABEL")}:`} text={convertEpochToDate(challanDetails?.taxPeriodFrom) || t("CS_NA")} />
            <Row label={`${t("UC_TO_DATE_LABEL")}:`} text={convertEpochToDate(challanDetails?.taxPeriodTo) || t("CS_NA")} />
            <Row label={`${t("UC_COMMENT_LABEL")}:`} text={`${challanDetails?.description || t("CS_NA")}`} />
            <Row label={`${t("CS_INBOX_STATUS_FILTER")}:`} text={t(`UC_${challanDetails?.applicationStatus || t("CS_NA")}`)} />
          </StatusTable>
          <div style={{ fontSize: "24px", padding: "10px 0px", fontWeight: "700" }}>{t("UC_CONSUMER_DETAILS_LABEL")}</div>
          <StatusTable>
            <Row label={`${t("UC_CONS_NAME_LABEL")}:`} text={challanDetails?.citizen.name || t("CS_NA")} />
            <Row label={`${t("UC_MOBILE_NUMBER")}:`} text={challanDetails?.citizen.mobileNumber || t("CS_NA")} />
            <Row label={`${t("UC_DOOR_NO_LABEL")}:`} text={challanDetails?.address.doorNo || t("CS_NA")} />
            <Row label={`${t("UC_BUILDING_NAME_LABEL")}:`} text={challanDetails?.address.buildingName || t("CS_NA")} />
            <Row label={`${t("UC_STREET_NAME_LABEL")}:`} text={challanDetails?.address.street || t("CS_NA")} />
            <Row
              label={`${t("UC_MOHALLA_LABEL")}:`}
              text={`${t(
                `${stringReplaceAll(challanDetails?.address?.tenantId?.toUpperCase(), ".", "_")}_REVENUE_${
                  challanDetails?.address?.locality?.code
                }` || t("CS_NA")
              )}`}
            />
          </StatusTable>
        </Card>
      </div>
      {showModal ? (
        <ActionModal
          t={t}
          action={selectedAction}
          // tenantId={tenantId}
          // state={state}
          // id={applicationNumber}
          applicationData={challanDetails}
          billData={challanBillDetails}
          closeModal={closeModal}
          submitAction={submitAction}
          // actionData={workflowDetails?.data?.timeline}
          // businessService={businessService}
        />
      ) : null}
      {showToast && <Toast error={showToast.key} label={t(showToast.label)} onClose={() => setShowToast(null)} />}
      {challanDetails?.applicationStatus == "ACTIVE" && (
        <ActionBar>
          {displayMenu && workflowActions ? <Menu localeKeyPrefix="UC" options={workflowActions} t={t} onSelect={onActionSelect} /> : null}
          <SubmitBar label={t("ES_COMMON_TAKE_ACTION")} onSubmit={() => setDisplayMenu(!displayMenu)} />
        </ActionBar>
      )}
    </React.Fragment>
  );
};

export default EmployeeChallan;
