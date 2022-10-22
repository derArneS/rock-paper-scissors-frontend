export type ShapeOverview = {
    _embedded: {
        resourceList: [
            {
                name: string,
                resource: string,
                _links: {
                    play: {
                        href: string
                    },
                    computer: {
                        href: string
                    }
                }
            }
        ]
    }
};