const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const BASE_URL = 'http://localhost:3000';
const TEST_EMAIL = 'selenium@test.com';
const TEST_PASSWORD = 'Selenium123';
const TEST_USERNAME = 'SeleniumUser';

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
    const options = new firefox.Options();
    // options.addArguments('--headless'); // descomentar para correr sin ventana

    const driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();

    let passed = 0;
    let failed = 0;

    async function assert(name, condition) {
        if (condition) {
            console.log(`  ✓ ${name}`);
            passed++;
        } else {
            console.log(`  ✗ FAILED: ${name}`);
            failed++;
        }
    }

    try {
        // ================================================================
        // TC-01  Registration with valid data
        // ================================================================
        console.log('\n TC-01 — Registration with valid data');
        await driver.get(BASE_URL);
        await sleep(3000);

        // Click en "Register"
        const registerBtn = await driver.findElement(By.xpath("//button[contains(text(), 'Register')]"));
        await registerBtn.click();
        await sleep(500);

        // Fill the form
        await driver.findElement(By.xpath("//input[@type='text'][1]")).sendKeys(TEST_USERNAME);
        await driver.findElement(By.xpath("//input[@type='email']")).sendKeys(TEST_EMAIL);
        await driver.findElement(By.xpath("//input[@type='password']")).sendKeys(TEST_PASSWORD);
        await driver.findElement(By.xpath("//button[contains(text(), 'Create Account')]")).click();
        await sleep(2000);

        // Verify that we reached the feed
        const feedTitle = await driver.findElement(By.xpath("//*[contains(text(), 'Recent Posts')]"));
        await assert('Usuario registrado correctamente y redirigido al feed', feedTitle !== null);

        // ================================================================
        // TC-03 Logout and Login with correct credentials
        // ================================================================
        console.log('\n TC-03 Logout and Login with correct credentials');

        // Logout
        const logoutBtn = await driver.findElement(By.xpath("//button[.//span[contains(text(), 'Log out')]]"));
        await logoutBtn.click();
        await sleep(5000);
        await driver.navigate().refresh();
        await sleep(2000);

    
        await driver.wait(until.elementLocated(By.xpath("//input[@type='email']")), 5000);

        
        const emailInput = await driver.findElement(By.xpath("//input[@type='email']"));
        const passwordInput = await driver.findElement(By.xpath("//input[@type='password']"));
        await emailInput.clear();
        await passwordInput.clear();
        await emailInput.sendKeys(TEST_EMAIL);
        await passwordInput.sendKeys(TEST_PASSWORD);

        // Find the button by its position on the form
        const loginBtn = await driver.findElement(By.xpath("//button[@type='submit']"));
        await loginBtn.click();
        await sleep(5000);



        const feedAfterLogin = await driver.findElement(By.xpath("//*[contains(text(), 'Recent Posts')]"));
        await assert('Login correcto, usuario redirigido al feed', feedAfterLogin !== null);

        // ================================================================
        // TC-04 Login with incorrect password
        // ================================================================
        console.log('\n TC-04  Login with incorrect password');

        // Logout
        const logoutBtn2 = await driver.findElement(By.xpath("//button[.//span[contains(text(), 'Log out')]]"));
        await logoutBtn2.click();
        await sleep(1000);

        await driver.findElement(By.xpath("//input[@type='email']")).sendKeys(TEST_EMAIL);
        await driver.findElement(By.xpath("//input[@type='password']")).sendKeys('wrongpassword');
        await driver.findElement(By.xpath("//button[.//text()[contains(., 'Log In')]]")).click();
        await sleep(1500);

        const errorMsg = await driver.findElement(By.xpath("//*[contains(text(), 'Invalid') or contains(text(), 'incorrect') or contains(text(), 'failed')]"));
        await assert('Mensaje de error mostrado con contraseña incorrecta', errorMsg !== null);

        // ================================================================
        // TC-02 Registration with duplicate email
        // ================================================================
        console.log('\n TC-02 Registration with duplicate email');

        const registerBtn2 = await driver.findElement(By.xpath("//button[contains(text(), 'Register')]"));
        await registerBtn2.click();
        await sleep(500);

        await driver.findElement(By.xpath("//input[@type='text'][1]")).sendKeys('OtroUsuario');
        await driver.findElement(By.xpath("//input[@type='email']")).sendKeys(TEST_EMAIL);
        await driver.findElement(By.xpath("//input[@type='password']")).sendKeys(TEST_PASSWORD);
        await driver.findElement(By.xpath("//button[contains(text(), 'Create Account')]")).click();
        await sleep(1500);

        const duplicateError = await driver.findElement(By.xpath("//*[contains(text(), 'already') or contains(text(), 'registrado') or contains(text(), 'exists')]"));
        await assert('Error mostrado al registrar email duplicado', duplicateError !== null);

    } catch (err) {
        console.log(`  ✗ Error inesperado: ${err.message}`);
        failed++;
    } finally {
        await driver.quit();
        console.log(`\n Results: ${passed} passed, ${failed} failed`);
        if (failed > 0) process.exit(1);
    }
}

runTests();