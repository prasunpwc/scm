import React, { useEffect, useState } from "react";
import {
  CardLabel,
  LabelFieldPair,
  Dropdown,
  UploadFile,
  Toast,
  Loader,
  CardHeader,
  CardSectionHeader,
} from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";

const WSDisconnectionDocsEmployee = ({ t, config, onSelect, userType, formData, setError: setFormError, clearErrors: clearFormErrors, formState }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const [documents, setDocuments] = useState(formData?.DocumentsRequired?.documents || []);
  const [error, setError] = useState(null);
  const wsDocsData = window.location.href.includes("modify") ? "ModifyConnectionDocuments" : "Documents";
  let action = "create";

  const { pathname } = useLocation();
  const isEditScreen = pathname.includes("/edit-disconnection-by-config/");
  const isMutation = pathname.includes("/property-mutate/");

  if (isEditScreen) action = "update";

  const { isLoading, data: wsDocs2 } = Digit.Hooks.ws.WSSearchMdmsTypes.useWSServicesMasters(stateId, wsDocsData);

  const wsDocs={Documents: [
    {
      "code": "OWNER.IDENTITYPROOF",
      "documentType": "OWNER",
      "required": true,
      "active": true,
      "hasDropdown": false,
      "dropdownData": [
          {
              "code": "OWNER.IDENTITYPROOF.AADHAAR",
              "active": true,
              "i18nKey": "OWNER_IDENTITYPROOF_AADHAAR"
          },
          {
              "code": "OWNER.IDENTITYPROOF.VOTERID",
              "active": true,
              "i18nKey": "OWNER_IDENTITYPROOF_VOTERID"
          },
          {
              "code": "OWNER.IDENTITYPROOF.DRIVING",
              "active": true,
              "i18nKey": "OWNER_IDENTITYPROOF_DRIVING"
          },
          {
              "code": "OWNER.IDENTITYPROOF.PAN",
              "active": true,
              "i18nKey": "OWNER_IDENTITYPROOF_PAN"
          },
          {
              "code": "OWNER.IDENTITYPROOF.PASSPORT",
              "active": true,
              "i18nKey": "OWNER_IDENTITYPROOF_PASSPORT"
          }
      ],
      "description": "OWNER.ADDRESSPROOF.IDENTITYPROOF_DESCRIPTION",
      "i18nKey": "OWNER_IDENTITYPROOF"
  },
  {
    "code": "OWNER.ADDRESSPROOF",
    "documentType": "OWNER",
    "required": true,
    "active": true,
    "hasDropdown": false,
    "dropdownData": [
        {
            "code": "OWNER.ADDRESSPROOF.ELECTRICITYBILL",
            "active": true,
            "i18nKey": "OWNER_ADDRESSPROOF_ELECTRICITYBILL"
        },
        {
            "code": "OWNER.ADDRESSPROOF.DL",
            "active": true,
            "i18nKey": "OWNER_ADDRESSPROOF_DL"
        },
        {
            "code": "OWNER.ADDRESSPROOF.VOTERID",
            "active": true,
            "i18nKey": "OWNER_ADDRESSPROOF_VOTERID"
        },
        {
            "code": "OWNER.ADDRESSPROOF.AADHAAR",
            "active": true,
            "i18nKey": "OWNER_ADDRESSPROOF_AADHAAR"
        },
        {
            "code": "OWNER.ADDRESSPROOF.PAN",
            "active": true,
            "i18nKey": "OWNER_ADDRESSPROOF_PAN"
        },
        {
            "code": "OWNER.ADDRESSPROOF.PASSPORT",
            "active": true,
            "i18nKey": "OWNER_ADDRESSPROOF_PASSPORT"
        }
    ],
    "description": "OWNER.ADDRESSPROOF.ADDRESSPROOF_DESCRIPTION",
    "i18nKey": "OWNER_ADDRESSPROOF"
}
]}

  // const { isLoading: wsDocsLoading, data: wsDocs2 } =  Digit.Hooks.ws.WSSearchMdmsTypes.useWSServicesMasters(tenantId, "DisconnectionDocuments");
  console.log(wsDocs,wsDocs2,"wsDocs");
  const goNext = () => {
    onSelect(config.key, { documents });
  };

  useEffect(() => {
    goNext();
  }, [documents]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  const applicationDetailsData = JSON.parse(sessionStorage.getItem("WS_EDIT_APPLICATION_DETAILS"));

  if (
    (window.location.href.includes("edit") && applicationDetailsData?.applicationData?.documents?.length > 0)
  ) {
    const documentsData = applicationDetailsData?.applicationData?.documents || [];
    documentsData?.map(documentData => {
      wsDocs?.[wsDocsData]?.forEach(docData => {
        const docType = docData?.code?.split(".")[1] ? docData?.code?.split(".")[0] + "." + docData?.code?.split(".")[1] : docData?.code?.split(".")[0]
        const dataDocType = documentData?.documentType?.split(".")[1] ? documentData?.documentType?.split(".")[0] + "." + documentData?.documentType?.split(".")[1] : documentData?.documentType?.split(".")[0]
        if (docType == dataDocType) {
          docData.auditDetails = documentData.auditDetails
          docData.documentType = docData.documentType
          docData.documentUid = documentData.documentUid
          docData.fileStoreId = documentData.fileStoreId
          docData.id = documentData.id
          docData.status = "ACTIVE"
        }
      })
    })
  }
  
  return (
    <div>
      {wsDocs?.Documents?.map((document, index) => {
        return (
          <SelectDocument
            key={index}
            document={document}
            action={action}
            t={t}
            id={`pt-document-${index}`}
            error={error}
            setError={setError}
            setDocuments={setDocuments}
            documents={documents}
            formData={formData}
            setFormError={setFormError}
            clearFormErrors={clearFormErrors}
            config={config}
            formState={formState}
          />
        );
      })}
      {error && <Toast label={error} onClose={() => setError(null)} error />}
    </div>
  );
};

function SelectDocument({
  t,
  document: doc,
  setDocuments,
  error,
  setError,
  documents,
  action,
  formData,
  setFormError,
  clearFormErrors,
  config,
  formState,
  fromRawData,
  id,
}) {
  const filteredDocument = documents?.filter((item) => item?.documentType?.includes(doc?.code))[0];
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [selectedDocument, setSelectedDocument] = useState(
    filteredDocument
      ? { ...filteredDocument, code: filteredDocument?.documentType }
      : doc?.dropdownData?.length === 1
        ? doc?.dropdownData[0]
        : {}
  );
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(() => filteredDocument?.fileStoreId || null);

  const handleSelectDocument = (value) => setSelectedDocument(value);

  useEffect(() => {
    if (filteredDocument) {
      setSelectedDocument(filteredDocument
        ? { ...filteredDocument, code: filteredDocument?.documentType }
        : doc?.dropdownData?.length === 1
          ? doc?.dropdownData[0]
          : {})
    }
  }, [])

  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  const { dropdownData } = doc;
  const { dropdownFilter, enabledActions, filterCondition } = doc?.additionalDetails || {};
  var dropDownData = dropdownData;
  const [isHidden, setHidden] = useState(false);

  const addError = () => {
    let type = formState.errors?.[config.key]?.type;
    if (!Array.isArray(type)) type = [];
    if (!type.includes(doc.code)) {
      type.push(doc.code);
      setFormError(config.key, { type });
    }
  };

  const removeError = () => {
    let type = formState.errors?.[config.key]?.type;
    if (!Array.isArray(type)) type = [];
    if (type.includes(doc?.code)) {
      type = type.filter((e) => e != doc?.code);
      if (!type.length) {
        clearFormErrors(config.key);
      } else {
        setFormError(config.key, { type });
      }
    }
  };

  useEffect(() => {
    if (selectedDocument?.code) {
      setDocuments((prev) => {
        const filteredDocumentsByDocumentType = prev?.filter((item) => item?.documentType !== selectedDocument?.code);

        if (uploadedFile?.length === 0 || uploadedFile === null) {
          return filteredDocumentsByDocumentType;
        }

        const filteredDocumentsByFileStoreId = filteredDocumentsByDocumentType?.filter((item) => item?.fileStoreId !== uploadedFile);
        return [
          ...filteredDocumentsByFileStoreId,
          {
            documentType: selectedDocument?.code,
            fileStoreId: uploadedFile,
            // documentUid: doc?.documentUid ? doc?.documentUid : uploadedFile,
            i18nKey: selectedDocument?.code,
            id: doc?.id,
            status: "ACTIVE"
          },
        ];
      });
    }
    if (!isHidden) {
      if ((!uploadedFile || !selectedDocument?.code) && doc?.required) {
        addError();
      } else if (uploadedFile && selectedDocument?.code) {
        removeError();
      }
    } else if (isHidden) {
      removeError();
    }
  }, [uploadedFile, selectedDocument, isHidden]);


  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            setUploadedFile(null);
            const response = await Digit.UploadServices.Filestorage("WS", file, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("CS_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            setError(t("CS_FILE_UPLOAD_ERROR"));
          }
        }
      }
    })();
  }, [file]);

  useEffect(() => {
    if (isHidden) setUploadedFile(null);
  }, [isHidden]);

  return (
    <div style={{ marginBottom: "24px" }}>
      <LabelFieldPair>
        <CardLabel style={{ marginTop: "-5px", fontWeight: "700" }} className="card-label-smaller">{t(doc?.i18nKey) + "*"}</CardLabel>
        <div className="field">
          <UploadFile
            onUpload={selectfile}
            onDelete={() => {
              setUploadedFile(null);
            }}
            id={id}
            message={uploadedFile ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)}
            textStyles={{ width: "100%" }}
            inputStyles={{ width: "280px" }}
            buttonType="button"
            error={!uploadedFile}
          />
        </div>
      </LabelFieldPair>
    </div>
  );
}

export default WSDisconnectionDocsEmployee;

