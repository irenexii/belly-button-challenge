function init() {
   
    const dropdown = d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      data.names.forEach(sample => {
        dropdown.append("option").text(sample).property("value", sample);
      });

      updatePlots(data.names[0]);
    });
  }
// Function to create the bar chart
function createBarChart(sampleData) {
    const sampleValues = sampleData.sample_values.slice(0, 10).reverse();
    const otuIds = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const otuLabels = sampleData.otu_labels.slice(0, 10).reverse();
  
    const trace1 = {
      x: sampleValues,
      y: otuIds,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };
  
    const layout1 = {
      title: "Top 10 OTUs",
    };
  
    const data1 = [trace1];
  
    Plotly.newPlot("bar", data1, layout1);
  }
  
  // Function to create the bubble chart
  function createBubbleChart(sampleData) {
    const otuIds = sampleData.otu_ids;
    const sampleValues = sampleData.sample_values;
    const otuLabels = sampleData.otu_labels;
  
    const trace2 = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Earth',
        colorbar: { title: 'OTU IDs' }
      }
    };
  
    const layout2 = {
      title: 'Bubble Chart for Each Sample',
    };
  
    const data2 = [trace2];
  
    Plotly.newPlot('bubble', data2, layout2);
  }
  
  // Function to display metadata
  function displayMetadata(metadata) {
    const metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");
  
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  }
  
  // Function to update plots and metadata
  function updatePlots(selectedSample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        const selectedData = data.samples.find(sample => sample.id === selectedSample);
        createBarChart(selectedData);
        createBubbleChart(selectedData);
        displayMetadata(data.metadata[0]);
    });
}

  
  // Function to initialize the dropdown and update plots
  function init() {
    const dropdownMenu = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      data.names.forEach(name => {
        dropdownMenu.append("option").attr("value", name).text(name);
      });
  
      updatePlots(data.names[0]);
    });
  }
  
  // Event handler for dropdown change
  function optionChanged(selectedSample) {
    updatePlots(selectedSample);
  }
  
  // Initialize the webpage
  init();
  