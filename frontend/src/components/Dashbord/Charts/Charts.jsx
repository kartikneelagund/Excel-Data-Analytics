import "./Charts.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import { iconsImgs } from "../../Dashbord/utils/images";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const chartTypes = ["Bar", "Line", "Pie"];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Charts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const [data, setData] = useState([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [chartType, setChartType] = useState("Bar");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (!jsonData || jsonData.length === 0) {
        alert("Invalid or empty Excel file.");
        return;
      }

      const keys = Object.keys(jsonData[0]);
      if (keys.length < 2) {
        alert("Excel must contain at least 2 columns.");
        return;
      }

      setXKey(keys[0]);
      setYKey(keys[1]);
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleCellChange = (rowIndex, key, value) => {
    const updatedData = data.map((row, i) =>
      i === rowIndex
        ? {
            ...row,
            [key]: value.trim() === ""
              ? ""
              : isNaN(value)
              ? value
              : Number(value),
          }
        : row
    );
    setData(updatedData);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "edited-data.xlsx");
  };

  const handleDownloadImage = () => {
    if (!chartRef.current) return;
    htmlToImage.toJpeg(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "chart.jpg";
      link.click();
    });
  };

  const handleDownloadPDF = () => {
    if (!chartRef.current) return;
    htmlToImage.toPng(chartRef.current).then((imgData) => {
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
      pdf.save("chart.pdf");
    });
  };

  const renderChart = () => {
    if (!xKey || !yKey || data.length === 0) return null;
    switch (chartType) {
      case "Bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "Line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yKey} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "Pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey={yKey}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid-two-item grid-common grid-c5">
      <div className="grid-c-top text-silver-v5">
        <h2 className="lg-value">Charts</h2>
        {location.pathname !== "/charts" && (
          <button
            className="grid-c-title-icon"
            onClick={() => navigate("/charts")}
          >
            <img src={iconsImgs.plus} alt="Add" />
          </button>
        )}
      </div>

      <div className="chart-page">
        <h2>📊 Upload Excel, Edit & Download</h2>

        <div className="top-controls">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="file-input"
          />

          <div className="chart-controls">
            <label>Select Chart Type: </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              {chartTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {data.length > 0 && (
          <div ref={chartRef} className="chart-wrapper">
            {renderChart()}
          </div>
        )}

        {location.pathname === "/charts" && data.length > 0 && (
          <>
            <div className="download-controls">
              <button onClick={handleExportExcel}>⬇️ Download Excel</button>
              <button onClick={handleDownloadImage}>🖼️ Download JPG</button>
              <button onClick={handleDownloadPDF}>📄 Download PDF</button>
            </div>

            <div className="data-table active">
              <table>
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      {Object.entries(row).map(([key, val]) => (
                        <td key={key}>
                          <input
                            value={val}
                            onChange={(e) =>
                              handleCellChange(i, key, e.target.value)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Charts;
