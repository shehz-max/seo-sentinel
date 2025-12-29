# How to Configure Gmail for Contact Form

To receive emails from your website contact form, you need to generate a specific "App Password" from Google. You cannot use your regular Gmail password.

## Step 1: Enable 2-Step Verification
*(If you already have this enabled, skip to Step 2)*

1. Go to your **[Google Account Security Page](https://myaccount.google.com/security)**.
2. Scroll down to the **"How you sign in to Google"** section.
3. Click on **2-Step Verification**.
4. Follow the prompts to enable it (usually by adding your phone number).

## Step 2: Generate an App Password

1. Go back to the **[Google Account Security Page](https://myaccount.google.com/security)**.
2. In the search bar at the very top of the page, type **"App passwords"** and click the result.
   - *Note: If you don't see this, make sure 2-Step Verification is ON.*
3. You may be asked to sign in again.
4. "App name": Type a name like `SEO Website`.
5. Click **Create**.
6. Google will show you a **16-character code** in a yellow bar (e.g., `abcd efgh ijkl mnop`).
   - **COPY THIS CODE.** This is your `EMAIL_PASS`.

## Step 3: Add to Your Project

1. Open the file named `.env.local` in your project folder (VS Code).
2. Add these two lines at the bottom:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=paste-the-16-char-code-here
```
*(Replace `your-actual-email@gmail.com` with your real Gmail address)*
*(Replace `paste-the-16-char-code-here` with the code you copied, spaces don't matter)*

## Step 4: Restart Server for Changes to Take Effect

1. Stop your running server (Ctrl + C in terminal).
2. Run `npm run dev` again.

Done! The contact form will now send real emails to you.
