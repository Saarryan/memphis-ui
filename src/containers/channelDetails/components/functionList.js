import React from "react";
import VerifiedBedge from "./verifiedBadge";
import { Pagination } from 'antd';
import SearchInput from "../../../components/searchInput/searchInput";
import SelectComponent from "../../../components/select/select";
import { SearchOutlined } from "@ant-design/icons";
import "./functionList.scss";

const funcList = [{
    id: 1,
    funcName: "Sentiment analysis",
    funcDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat commodo mauris, eget imperdiet nisl interdum vel.",
    inputDataType: "JSON",
    outputDataType: "JSON",
    isVerified: true,
    funcImg: "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
},
{
    id: 2,
    funcName: "Sentiment analysis",
    funcDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat commodo mauris, eget imperdiet nisl interdum vel.",
    inputDataType: "Text",
    outputDataType: "JSON",
    isVerified: true,
    funcImg: null
},
{
    id: 3,
    funcName: "Sentiment analysis",
    funcDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat commodo mauris, eget imperdiet nisl interdum vel.",
    inputDataType: "XML",
    outputDataType: "JSON",
    isVerified: false,
    funcImg: "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
}]

function FunctionList(props) {
    const [activeFunction, setActiveFunction] = React.useState(null);

    const chooseFunction = func => {
        setActiveFunction(func.id)
        props.chooseFunction(func)
    }

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", height: "8vh", justifyContent: "space-between", width:"100%" }}>
                <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: 0, marginLeft: "30px" }}>Functions</p>
                <div style={{ display: "flex" }}>
                    <SelectComponent
                        value="val0"
                        colorType="navy"
                        backgroundColorType="transparent"
                        borderColorType="gray"
                        radiusType="circle"
                        width="10vw"
                        height="27px"
                        options={["op1", "op2"]}
                        boxShadowsType="gray"
                        onChange={(e) => console.log(e)}
                        dropdownClassName="pipline-field" />
                    <SearchInput
                        placeholder="Search here"
                        colorType="navy"
                        backgroundColorType="transparent"
                        width="10vw"
                        height="27px"
                        borderRadiusType="circle"
                        // borderColorType="gray"
                        border="solid 1px #D8D8D8"
                        iconComponent={<SearchOutlined />}
                    //   onChange={handleSearch}
                    //   value={searchInput}
                    />
                </div>
            </div>
            <div style={{ overflowY: "scroll", height:"42vh"}}>
                {funcList && funcList.map(func => <div className="function-item-container" key={func.id} style={{ border: func.id === activeFunction && "1px solid #5A4FE5" }} onClick={() => chooseFunction(func)}>
                    <div className="function-details">
                        {func.funcImg ? <img src={func.funcImg} alt="function" width="50" height="50" className="img-placeholder" /> : <div className="img-placeholder" />}
                        <div>
                            <p className="function-name">{func.funcName}</p>
                            <p className="data-type">Data type: {func.inputDataType}</p>
                            {func.isVerified && <VerifiedBedge />}
                        </div>
                    </div>
                    <div>
                        {func.funcDesc}
                    </div>
                </div>)}
                
            </div>
            <Pagination
                    // total={funcList.length}
                    total={100}
                    showSizeChanger
                    showQuickJumper
                // showTotal={total => `Total ${total} items`}
                />
        </div>
    );
}
export default FunctionList;
