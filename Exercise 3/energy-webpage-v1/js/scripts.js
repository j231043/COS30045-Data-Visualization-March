
// setting up variable for elements in HTML page
const button_nav_home = document.querySelector("#nav_home");
const button_nav_tv = document.querySelector("#nav_tv");
const button_nav_abt = document.querySelector("#nav_abt");
const main = document.querySelector("main");

// content to be inserted into html main tag
const content_home = `
    <h1>Welcome to Australia Appliance Energy Consumption</h1>
    <p>Here you can find the energy consumption rate of common household appliances in Australia. The list is update monthly.</p>

    <h2>Appliance Energy Consumption in Australia</h2>
    <p>Household appliances and equipment account for an average of 25% of total residential energy consumption across Australia. However, this proportion will vary by household depending on the climate, the types of appliances in your home, and the way they are used. Heating and cooling uses around 40% of household energy use.
    <br>
    Appliances that use the largest amounts of energy include fridges and freezers (responsible for an average 7% of household energy use), clothes dryers (up to 10% of household energy use for heavy users), and TVs and home entertainment equipment (an average of around 5% of household energy use). In homes with a pool, the pool pump is a high user of energy (up to 18%).
    <br>
    Household appliances contribute to peak electricity demand, which refers to major spikes in electricity use that occurs at certain times (for example, between 5pm and 8pm when people arrive home from work and turn on their air-conditioners, TVs, lights, and other appliances). If peak demand exceeds the maximum supply levels, some regions can experience electricity outages. Supplying electricity for an ever-increasing peak demand requires building more electricity infrastructure, which is paid for by increases in energy prices.
    </p>
    <p>Source: <a href="https://www.yourhome.gov.au/energy/appliances">https://www.yourhome.gov.au/energy/appliances</a></p>
`;

const content_tv = `
    <h1>TV</h1>
    <p>Depending on level of usage, TV may be a take up a portion of energy bills. However, that does not mean that we should stop watching TVs, but rather we should purchase energy efficient TVs so that we are able to continue watching TVs without putting a dent on our budget. There are several factors that influences the energy consumption of TVs, including screen technology and screen size.</p>

    <h2>Screen technology</h2>
    <p>There are different screen technologies for TV, each with their own advantages and disadvantages in terms color accuracy and contrast, viewing angles, design etc. They also differ in terms of power consumption. So one of the most pressing question on a cost-conscious consumer's mind is: Which screen technology consumes the least energy to ensure low energy bills?</p>

    <p>Online research would reveal that amongst the 3 most popular technologies, LCD, LED and OLED, OLED consumes the most energy while LED consumes the least energy. LCD is in the middle in terms of energy consumption. However, to get a definitive answer, it is better to investigate actual TV models in the market and compare the energy use. We can use the energy rating data for household appliances provided by the Australian government for our research, and the data for TV is available at: <a href="https://data.gov.au/data/dataset/energy-rating-for-household-appliances/resource/93a615e5-935e-4713-a4b0-379e3f6dedc9">https://data.gov.au/data/dataset/energy-rating-for-household-appliances/resource/93a615e5-935e-4713-a4b0-379e3f6dedc9</a></p>

    <p>The dataset contains many information and columns, but to find average enery consumption for each screen technology, we will only require two data: screen technology and power consumption. However, in this dataset, there are 3 types of power consumption listed:</p>

    <ul>
        <li>Pasv_stnd_power: the amount of energy used by the appliance in passive standby power mode</li>
        <li>Act_stnd_power: the amount of energy used by the appliance in active standby power mode</li>
        <li>Avg_mode_power: the amount of energy used by the appliance when the television is in use.</li>
    </ul>

    <p>For simplicity's sake, we will be using avg_mode_power, which is the amount of energy used by the appliance when the television is in use, since how much power the TV consumes when it is switched on and actively in use is a more realistic indicator of energy use for an average consumer. We will get the mean value of avg_mode_power for each type of screen technology, and the screen technology with the lowest mean value will be the one that consumes the least energy. The results are as follows:</p>

    <img src="images/datagraph_tech.png" alt="Bar chart showing the mean of energy use when the tv is in use for each screen technology.">   

    <p>The results are rather surprising. As we can see from the bar chart above, instead of LCD consuming the least energy as we stated in the hypothesis, the screen technology with lowest energy consumption is actually LED on the left, with the mean value of 86.04, followed by LCD in the middle with mean value of 120.11, and finally OLED on the right with mean value of 128.71. There is a difference of around 35 between LED and LCD, while only a small difference of around 8 between LCD and OLED. This shows that LED consumes significantly less energy than the two other types screen technology. </p>

    <p>The following image shows the storyboard of how this data is presented to user: </p>

    <img src="images/storyboard_tech.png" alt="Storyboard of how relationship between screen technology and power consumption is presented to viewers">


    <h2>Screen Size</h2>


`;


const content_abt = `
    <h1>About us</h1>
    <p>We are the Australia Consumer Group.</p>
`;

// function to highlight current page on the navigation menu
function display_current_page(current){
    button_nav_home.style.backgroundColor = "";
    button_nav_tv.style.backgroundColor = "";
    button_nav_abt.style.backgroundColor = "";
    current.style.backgroundColor = "#f6f5b4";

}

// function to insert content into html page 
function display_home() {
    main.innerHTML = content_home;
    display_current_page(button_nav_home);
};

function display_tv() {
    main.innerHTML = content_tv;
    display_current_page(button_nav_tv);

};

function display_abt() {
    main.innerHTML = content_abt;
    display_current_page(button_nav_abt);

};


// event listeners for each page on the navigation menu
button_nav_home.addEventListener("click", display_home)
button_nav_tv.addEventListener("click", display_tv)
button_nav_abt.addEventListener("click", display_abt)

// default behaviour when page is first loaded is display homepage
display_home();



