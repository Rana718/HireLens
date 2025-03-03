

export function entriesToMarkdown(entries: any, type: any) {
    if (!entries?.length) return "";

    return (
        `## ${type}\n\n` +
        entries
            .map((entry: any) => {
                const dateRange = entry.current
                    ? `${entry.startDate} - Present`
                    : `${entry.startDate} - ${entry.endDate}`;
                return `### ${entry.title} @ ${entry.organization}\n${dateRange}\n\n${entry.description}`;
            })
            .join("\n\n")
    );
}
