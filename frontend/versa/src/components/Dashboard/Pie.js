import React, { useState } from "react";
import * as V from "victory";
import styled from "styled-components";
import theme from "../Reusable/Colors";

// salesByProductData = [
//     { x: "Goober \nCandle", y: 32 },
//     { x: "Duck \nEggs", y: 27 },
//     { x: "Totem \nCandle", y: 21 },
//     { x: "Horseshoe \nMagnet", y: 10 },
//     { x: "Other", y: 20 },
// ];

const Pie = ({ data }) => {
    console.log(data, "pie");
    const [salesData, setSalesData] = useState();

    return (
        <PieContainer>
            <V.VictoryPie
                padding={{ top: 0, left: 100, right: 100 }}
                padAngle={2}
                innerRadius={50}
                labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                colorScale={[
                    theme.primaryHover,
                    theme.primaryHover + "cc",
                    theme.primaryHover + "99",
                    theme.primaryHover + "66",
                    theme.primaryHover + "33",
                ]}
                data={data}
            />
        </PieContainer>
    );
};

export default Pie;

const PieContainer = styled.div`
    margin-top: -18px;
    margin-bottom: -18px;
`;