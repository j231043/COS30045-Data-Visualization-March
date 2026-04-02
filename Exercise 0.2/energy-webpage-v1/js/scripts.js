
const button_nav_home = document.querySelector("#nav-home");
const button_nav_tv = document.querySelector("#nav-tv");
const button_nav_abt = document.querySelector("#nav-abt");

const main = document.querySelector("main");

const content_home = `
    <h1>Welcome to Australia Appliance Energy Consumption<h1>
    <p>Here you can find the energy consumption rate of common household appliances in Australia. The list is update monthly.</p>

    <h2>Appliance Energy Consumption in Australia<h2>
    <p>Household appliances and equipment account for an average of 25% of total residential energy consumption across Australia. However, this proportion will vary by household depending on the climate, the types of appliances in your home, and the way they are used. Heating and cooling uses around 40% of household energy use.
    <br>
    Appliances that use the largest amounts of energy include fridges and freezers (responsible for an average 7% of household energy use), clothes dryers (up to 10% of household energy use for heavy users), and TVs and home entertainment equipment (an average of around 5% of household energy use). In homes with a pool, the pool pump is a high user of energy (up to 18%).
    <br>
    Household appliances contribute to peak electricity demand, which refers to major spikes in electricity use that occurs at certain times (for example, between 5pm and 8pm when people arrive home from work and turn on their air-conditioners, TVs, lights, and other appliances). If peak demand exceeds the maximum supply levels, some regions can experience electricity outages. Supplying electricity for an ever-increasing peak demand requires building more electricity infrastructure, which is paid for by increases in energy prices.
    </p>
    <p>Source: https://www.yourhome.gov.au/energy/appliances</p>
`;

const content_tv = `
    <h1>TV<h1>
    <p>Here you can find the energy consumption rate of appliances in Australia. The list is update annually.</p>
`;

const content_abt = `
    <h1>About us<h1>
    <p>We are the Australia Consumer Group.</p>
`;

function display_home() {
    main.innerHTML = content_home;
};

function display_tv() {
    main.innerHTML = content_tv;
};

function display_abt() {
    main.innerHTML = content_abt;
};



button_nav_home.addEventListener("click", display_home)
button_nav_tv.addEventListener("click", display_tv)
button_nav_abt.addEventListener("click", display_abt)

display_home();



