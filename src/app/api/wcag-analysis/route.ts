// src/app/api/wcag-analysis/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import axe from 'axe-core';

export async function POST(request: Request) {
    const { url } = await request.json();

    if (!url || !url.startsWith('http')) {
        return NextResponse.json({ message: 'Invalid URL provided', status: 'negative' }, { status: 400 });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Inject axe-core into the page
        await page.addScriptTag({ path: require.resolve('axe-core') });

        // Run axe-core audit
        const result = await page.evaluate(async () => {
            return await axe.run();
        });

        await browser.close();

        if (result.violations.length > 0) {
            const violationMessages = result.violations.map((v: any) => v.description).join('\n');
            return NextResponse.json({
                message: `WCAG analysis of the URL (${url}) found issues:\n${violationMessages}`,
                status: 'negative',
            });
        }

        return NextResponse.json({
            message: `WCAG analysis of the URL (${url}) is positive! No major issues found.`,
            status: 'positive',
        });

    } catch (error) {
        await browser.close();
        let errorMessage = 'An unknown error occurred';

        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ message: `Error during WCAG analysis: ${errorMessage}`, status: 'negative' }, { status: 500 });
    }
}
