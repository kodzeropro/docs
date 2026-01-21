class Analytics {
    static YmId = 106372144;

    static trackPageView(url?: string) {
        // @ts-ignore
        ym(Analytics.YmId, 'hit', url || window.location.href);
    }
}

export default Analytics;