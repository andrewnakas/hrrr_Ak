// Simplified GRIB2 parser for HRRR Alaska composite reflectivity
// This parser extracts REFC data from GRIB2 files

class GRIB2Parser {
    constructor(arrayBuffer) {
        this.data = new DataView(arrayBuffer);
        this.offset = 0;
        this.messages = [];
    }

    // Read string from buffer
    readString(length) {
        const bytes = new Uint8Array(this.data.buffer, this.offset, length);
        this.offset += length;
        return String.fromCharCode(...bytes);
    }

    // Read unsigned integer (big-endian)
    readUInt(bytes) {
        let value = 0;
        for (let i = 0; i < bytes; i++) {
            value = (value << 8) | this.data.getUint8(this.offset++);
        }
        return value;
    }

    // Read signed integer (big-endian)
    readInt(bytes) {
        let value = this.readUInt(bytes);
        const signBit = 1 << (bytes * 8 - 1);
        if (value & signBit) {
            value -= signBit * 2;
        }
        return value;
    }

    // Parse GRIB2 file
    parse() {
        // Check GRIB2 header
        const magic = this.readString(4);
        if (magic !== 'GRIB') {
            throw new Error('Not a valid GRIB file');
        }

        this.offset = 0; // Reset

        while (this.offset < this.data.byteLength - 4) {
            try {
                const message = this.parseMessage();
                if (message) {
                    this.messages.push(message);
                }
            } catch (e) {
                console.warn('Error parsing message at offset', this.offset, ':', e);
                // Try to find next GRIB message
                this.offset = this.findNextGRIB();
                if (this.offset === -1) break;
            }
        }

        return this.messages;
    }

    // Find next GRIB message
    findNextGRIB() {
        for (let i = this.offset + 1; i < this.data.byteLength - 4; i++) {
            if (this.readString(4) === 'GRIB') {
                return i;
            }
            this.offset = i;
        }
        return -1;
    }

    // Parse single GRIB message
    parseMessage() {
        const startOffset = this.offset;

        // Section 0: Indicator Section
        const indicator = this.readString(4);
        if (indicator !== 'GRIB') {
            return null;
        }

        this.offset += 2; // Reserved
        const discipline = this.readUInt(1);
        const edition = this.readUInt(1);
        const totalLength = this.readUInt(8);

        const message = {
            discipline,
            edition,
            totalLength,
            sections: []
        };

        // Parse sections until end
        while (this.offset < startOffset + totalLength) {
            const sectionLength = this.readUInt(4);
            const sectionNumber = this.readUInt(1);

            if (sectionNumber === 8) {
                // End section
                break;
            }

            const sectionData = {
                number: sectionNumber,
                length: sectionLength,
                offset: this.offset - 5
            };

            // Parse specific sections
            if (sectionNumber === 1) {
                // Identification section
                sectionData.center = this.readUInt(2);
                sectionData.subcenter = this.readUInt(2);
                sectionData.masterTable = this.readUInt(1);
                sectionData.localTable = this.readUInt(1);
                sectionData.refTimeSignificance = this.readUInt(1);
                sectionData.year = this.readUInt(2);
                sectionData.month = this.readUInt(1);
                sectionData.day = this.readUInt(1);
                sectionData.hour = this.readUInt(1);
                sectionData.minute = this.readUInt(1);
                sectionData.second = this.readUInt(1);
            } else if (sectionNumber === 4) {
                // Product Definition Section
                const coordCount = this.readUInt(2);
                const productTemplate = this.readUInt(2);

                sectionData.productTemplate = productTemplate;

                // For template 0 (analysis/forecast at horizontal level)
                if (productTemplate === 0 || productTemplate === 8) {
                    sectionData.parameterCategory = this.readUInt(1);
                    sectionData.parameterNumber = this.readUInt(1);
                    sectionData.generatingProcess = this.readUInt(1);

                    // Check if this is composite reflectivity (category 16, parameter 196)
                    if (sectionData.parameterCategory === 16 && sectionData.parameterNumber === 196) {
                        message.isREFC = true;
                    }
                }
            } else if (sectionNumber === 3) {
                // Grid Definition Section
                sectionData.gridDefinitionSource = this.readUInt(1);
                sectionData.dataPointCount = this.readUInt(4);
                sectionData.gridDefinitionTemplate = this.readUInt(2);
            } else if (sectionNumber === 5) {
                // Data Representation Section
                sectionData.dataPointCount = this.readUInt(4);
                sectionData.dataTemplate = this.readUInt(2);
            } else if (sectionNumber === 7) {
                // Data Section
                const dataLength = sectionLength - 5;
                sectionData.data = new Uint8Array(this.data.buffer, this.offset, dataLength);
                message.dataSection = sectionData;
            }

            message.sections.push(sectionData);

            // Skip to next section
            this.offset = sectionData.offset + sectionLength;
        }

        return message;
    }

    // Extract composite reflectivity data
    extractREFC() {
        const refcMessage = this.messages.find(m => m.isREFC);
        if (!refcMessage) {
            return null;
        }

        // Find grid definition and data sections
        const gridSection = refcMessage.sections.find(s => s.number === 3);
        const dataRepSection = refcMessage.sections.find(s => s.number === 5);
        const dataSection = refcMessage.dataSection;

        if (!gridSection || !dataSection) {
            return null;
        }

        return {
            gridDefinition: gridSection,
            dataPoints: dataRepSection?.dataPointCount || 0,
            rawData: dataSection.data,
            message: refcMessage
        };
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GRIB2Parser;
}
