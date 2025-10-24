#!/usr/bin/env node

/**
 * GoDaddy DNS Manager for Vercel
 * 
 * Usage:
 * node godaddy-dns.js list yourdomain.com
 * node godaddy-dns.js setup yourdomain.com
 */

const https = require('https');

// Set these as environment variables or replace directly
const API_KEY = process.env.GODADDY_API_KEY || 'YOUR_API_KEY';
const API_SECRET = process.env.GODADDY_API_SECRET || 'YOUR_API_SECRET';

const VERCEL_IP = '76.76.21.21';

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.godaddy.com',
            port: 443,
            path: path,
            method: method,
            headers: {
                'Authorization': `sso-key ${API_KEY}:${API_SECRET}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(body ? JSON.parse(body) : {});
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

async function listDomains() {
    try {
        const domains = await makeRequest('GET', '/v1/domains');
        console.log('\n📋 Your GoDaddy Domains:');
        domains.forEach(d => {
            console.log(`  • ${d.domain} (expires: ${d.expires})`);
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function listRecords(domain) {
    try {
        const records = await makeRequest('GET', `/v1/domains/${domain}/records`);
        console.log(`\n📋 DNS Records for ${domain}:`);
        records.forEach(r => {
            console.log(`  ${r.type.padEnd(6)} ${r.name.padEnd(15)} → ${r.data}`);
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function setupVercel(domain) {
    try {
        console.log(`\n🚀 Setting up ${domain} for Vercel...\n`);
        
        // A record for root domain
        await makeRequest('PUT', `/v1/domains/${domain}/records/A/@`, [
            { type: 'A', name: '@', data: VERCEL_IP, ttl: 600 }
        ]);
        console.log('✅ A record set: @ → 76.76.21.21');
        
        // CNAME for www
        await makeRequest('PUT', `/v1/domains/${domain}/records/CNAME/www`, [
            { type: 'CNAME', name: 'www', data: 'cname.vercel-dns.com', ttl: 600 }
        ]);
        console.log('✅ CNAME record set: www → cname.vercel-dns.com');
        
        console.log('\n🎉 DNS records configured for Vercel!');
        console.log('\n📝 Next steps:');
        console.log('1. Go to your Vercel project dashboard');
        console.log('2. Settings → Domains');
        console.log(`3. Add domain: ${domain}`);
        console.log('4. Wait 5-10 minutes for DNS propagation');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Main CLI handler
const command = process.argv[2];
const domain = process.argv[3];

if (!command) {
    console.log(`
GoDaddy DNS Manager for Vercel

Usage:
  node godaddy-dns.js domains              List all your domains
  node godaddy-dns.js list <domain>        List DNS records for domain
  node godaddy-dns.js setup <domain>       Setup domain for Vercel

Environment Variables:
  GODADDY_API_KEY      Your GoDaddy API key
  GODADDY_API_SECRET   Your GoDaddy API secret

Get your API keys at: https://developer.godaddy.com/keys
    `);
    process.exit(0);
}

switch (command) {
    case 'domains':
        listDomains();
        break;
    case 'list':
        if (!domain) {
            console.error('❌ Please provide a domain name');
            process.exit(1);
        }
        listRecords(domain);
        break;
    case 'setup':
        if (!domain) {
            console.error('❌ Please provide a domain name');
            process.exit(1);
        }
        setupVercel(domain);
        break;
    default:
        console.error(`❌ Unknown command: ${command}`);
        process.exit(1);
}

